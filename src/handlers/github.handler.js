const GitHub = require('github-api');
const env = require('dotenv');

env.config();

function GithubAPI(auth) {
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
  this.setRepo = function (userName, repoName) {
    repo = gh.getRepo(userName, repoName);
  };

  /**
     * Sets the current branch to make push to. If the branch doesn't exist yet,
     * it will be created first
     * @public
     * @param {string} branchName The name of the branch
     * @return {Promise}
     */
  this.setBranch = function (branchName) {
    if (!repo) {
      throw 'Repository is not initialized';
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
    });
  };

  /**
     * Makes the push to the currently set branch
     * @public
     * @param  {string}   message Message of the commit
     * @param  {object[]} files   Array of objects (with keys 'content' and 'path'),
     *                            containing data to push
     * @return {Promise}
     */
  this.pushFiles = function (message, files) {
    if (!repo) {
      throw 'Repository is not initialized';
    }
    if (!currentBranch.hasOwnProperty('name')) {
      throw 'Branch is not set';
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

  /**
     * Sets the current commit's SHA
     * @private
     * @return {Promise}
     */
  function getCurrentCommitSHA() {
    return repo.getRef(`heads/${currentBranch.name}`)
      .then((ref) => {
        currentBranch.commitSHA = ref.data.object.sha;
      });
  }

  /**
     * Sets the current commit tree's SHA
     * @private
     * @return {Promise}
     */
  function getCurrentTreeSHA() {
    return repo.getCommit(currentBranch.commitSHA)
      .then((commit) => {
        currentBranch.treeSHA = commit.data.tree.sha;
      });
  }

  /**
     * Creates blobs for all passed files
     * @private
     * @param  {object[]} filesInfo Array of objects (with keys 'content' and 'path'),
     *                              containing data to push
     * @return {Promise}
     */
  function createFiles(filesInfo) {
    const promises = [];
    const { length } = filesInfo;

    for (let i = 0; i < length; i++) {
      promises.push(createFile(filesInfo[i]));
    }

    return Promise.all(promises);
  }

  /**
     * Creates a blob for a single file
     * @private
     * @param  {object} fileInfo Array of objects (with keys 'content' and 'path'),
     *                           containing data to push
     * @return {Promise}
     */
  function createFile(fileInfo) {
    return repo.createBlob(fileInfo.content)
      .then((blob) => {
        filesToCommit.push({
          sha: blob.data.sha,
          path: fileInfo.path,
          mode: '100644',
          type: 'blob',
        });
      });
  }

  /**
     * Creates a new tree
     * @private
     * @return {Promise}
     */
  function createTree() {
    return repo.createTree(filesToCommit, currentBranch.treeSHA)
      .then((tree) => {
        newCommit.treeSHA = tree.data.sha;
      });
  }

  /**
     * Creates a new commit
     * @private
     * @param  {string} message A message for the commit
     * @return {Promise}
     */
  function createCommit(message) {
    return repo.commit(currentBranch.commitSHA, newCommit.treeSHA, message)
      .then((commit) => {
        newCommit.sha = commit.data.sha;
      });
  }

  /**
     * Updates the pointer of the current branch to point the newly created commit
     * @private
     * @return {Promise}
     */
  function updateHead() {
    return repo.updateHead(`heads/${currentBranch.name}`, newCommit.sha);
  }
}

const githubHandler = (req, res) => {
  const api = new GithubAPI({ token: 'fb36004eec1f05ea285fdbcec5dd9dd2193e9c19' }); api.setRepo(`${process.env.GITHUB_USERNAME}`, `${process.env.REPONAME}`); api.setBranch('main')
    .then(() => api.pushFiles('Making a 2nd commit of files', [{ content: 'You are a Wizard, Harry', path: 'harry.txt' }, { content: 'May the Force be with you', path: 'jedi.txt' }]))
    .then(() => { console.log('Files committed!'); });
  res.status(200).send('Files Commited!');
};

module.exports = {
  githubHandler,
};
