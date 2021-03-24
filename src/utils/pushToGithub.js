const GitHub = require('github-api');
const fs = require('fs');
const path = require('path');
const process = require('process');

function GithubAPIMethod(auth) {
  let repo;
  const filesToCommit = [];
  const currentBranch = {};
  const newCommit = {};

  // the underlying library for making requests
  const gh = new GitHub(auth);

  /**
     * Sets the current repository to make push to
     * @public
     * @param {string} userName Name of the user who owns the repository
     * @param {string} repoName Name of the repository
     * @return void
     */
  this.setRepo = (userName, repoName) => {
    repo = gh.getRepo(userName, repoName);
  };

  /**
     * Sets the current branch to make push to. If the branch doesn't exist yet,
     * it will be created first
     * @public
     * @param {string} branchName The name of the branch
     * @return {Promise}
     */
  this.setBranch = (branchName) => {
    if (!repo) {
      throw Object.assign(
        new Error('Repository is not initialized'),
      );
    }

    return repo.listBranches().then((branches) => {
      const branchExists = branches.data.find((branch) => branch.name === branchName);

      if (!branchExists) {
        return repo.createBranch('master', branchName)
          .then(() => {
            currentBranch.name = branchName;
          });
      }
      currentBranch.name = branchName;
      return null;
    });
  };

  /**
     * Sets the current commit's SHA
     * @private
     * @return {Promise}
     */

  const getCurrentCommitSHA = () => repo.getRef(`heads/${currentBranch.name}`)
    .then((ref) => {
      currentBranch.commitSHA = ref.data.object.sha;
    });

  /**
     * Sets the current commit tree's SHA
     * @private
     * @return {Promise}
     */
  const getCurrentTreeSHA = () => repo.getCommit(currentBranch.commitSHA)
    .then((commit) => {
      currentBranch.treeSHA = commit.data.tree.sha;
    });

  /**
     * Creates a blob for a single file
     * @private
     * @param  {object} fileInfo Array of objects (with keys 'content' and 'path'),
     *                           containing data to push
     * @return {Promise}
     */
  const createFile = (fileInfo) => repo.createBlob(fileInfo.content)
    .then((blob) => {
    // every file must have these parameters
      filesToCommit.push({
        sha: blob.data.sha,
        path: fileInfo.path,
        mode: '100644',
        type: 'blob',
      });
    });

  // /**
  //    * Creates blobs for all passed files
  //    * @private
  //    * @param  {object[]} filesInfo Array of objects (with keys 'content' and 'path'),
  //    *                              containing data to push
  //    * @return {Promise}
  //    */
  const createFiles = (filesInfo) => {
    const promises = [];
    const { length } = filesInfo;

    for (let i = 0; i < length; i += 1) {
      promises.push(createFile(filesInfo[i]));
    }

    return Promise.all(promises);
  };

  /**
     * Creates a new tree
     * @private
     * @return {Promise}
     */
  const createTree = () => repo.createTree(filesToCommit, currentBranch.treeSHA)
    .then((tree) => {
      newCommit.treeSHA = tree.data.sha;
    });

  /**
     * Creates a new commit
     * @private
     * @param  {string} message A message for the commit
     * @return {Promise}
     */
  const createCommit = (message) => repo.commit(currentBranch.commitSHA, newCommit.treeSHA, message)
    .then((commit) => {
      newCommit.sha = commit.data.sha;
    });

  /**
     * Updates the pointer of the current branch to point the newly created commit
     * @private
     * @return {Promise}
     */
  const updateHead = () => repo.updateHead(`heads/${currentBranch.name}`, newCommit.sha);

  /**
     * Makes the push to the currently set branch
     * @public
     * @param  {string}   message Message of the commit
     * @param  {object[]} files   Array of objects (with keys 'content' and 'path'),
     *                            containing data to push
     * @return {Promise}
     */
  this.pushFiles = (message, files) => {
    if (!repo) {
      throw Object.assign(
        new Error('Repository is not initialized'),
      );
    }
    const hasNameProperty = Object.prototype.hasOwnProperty.call(currentBranch, 'name');

    if (!hasNameProperty) {
      throw Object.assign(
        new Error('Branch is not set'),
      );
    }

    return getCurrentCommitSHA()
      .then(getCurrentTreeSHA)
      .then(() => createFiles(files))
      .then(createTree)
      .then(() => createCommit(message))
      .then(updateHead)
      .catch((e) => {
        console.error(e);
      });
  };
}

const getAllFilesFunction = (dirPath, arrayOfFiles) => {
  const files = fs.readdirSync(dirPath);
  let arrOfFiles = arrayOfFiles || [];
  files.forEach((file) => {
    if (fs.statSync(`${dirPath}/${file}`).isDirectory()) {
      arrOfFiles = getAllFilesFunction(`${dirPath}/${file}`, arrOfFiles);
    } else {
      arrOfFiles.push(path.join(dirPath, '/', file));
    }
  });
  return arrOfFiles;
};

const getAllFileDataFunction = (allFiles) => {
  const pathPrefix = `${process.cwd()}/`;
  const dataToPush = allFiles.map((filepath) => {
    let newFilePath;
    const text = fs.readFileSync(filepath).toString('utf-8');
    if (filepath.indexOf(pathPrefix) === 0) {
      newFilePath = filepath.slice(pathPrefix.length);
    }
    const fileObject = { content: text, path: newFilePath };
    return fileObject;
  });
  return dataToPush;
};

const pushToGithub = (
  folder, authToken, username, repositoryName, branchName, commitMessage,
) => {
  const getAllFiles = module.exports.getAllFilesFunction;
  const getAllFileData = module.exports.getAllFileDataFunction;
  const GithubAPI = module.exports.GithubAPIMethod;
  const allFiles = getAllFiles(folder[0]);
  const dataToPush = getAllFileData(allFiles);
  const api = new GithubAPI({ token: authToken });
  api.setRepo(username, repositoryName);
  return api.setBranch(branchName)
    .then(() => api.pushFiles(commitMessage, dataToPush))
    .then(() => {
      console.log('Files committed!');
    });
};

module.exports = {
  pushToGithub, getAllFileDataFunction, getAllFilesFunction, GithubAPIMethod,
};
