const env = require('dotenv');
const { GithubAPI } = require('../service/github.service');

env.config();

const githubHandler = (req, res) => {
  const api = new GithubAPI({ token: 'ACCESS_TOKEN' }); api.setRepo(`${process.env.GITHUB_USERNAME}`, `${process.env.REPONAME}`); api.setBranch('main')
    .then(() => api.pushFiles(req.body.commitMessage, [{ content: 'File_Content', path: 'dirName/fileName' }]))
    .then(() => { console.log('Files committed!'); });
  res.status(200).send('Files Commited!');
};

module.exports = {
  githubHandler,
};
