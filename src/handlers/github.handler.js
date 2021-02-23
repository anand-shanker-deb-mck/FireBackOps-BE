const env = require('dotenv');
const { GithubAPI } = require('../service/github.service');

env.config();

const githubHandler = (req, res) => {
  const api = new GithubAPI({ token: 'fb36004eec1f05ea285fdbcec5dd9dd2193e9c19' }); api.setRepo(`${process.env.GITHUB_USERNAME}`, `${process.env.REPONAME}`); api.setBranch('main')
    .then(() => api.pushFiles(req.body.commitMessage, [{ content: 'You are a Wooho, Harry', path: 'project/harry.txt' }, { content: 'May the Force be with you', path: 'project/jedi.txt' }]))
    .then(() => { console.log('Files committed!'); });
  res.status(200).send('Files Commited!');
};

module.exports = {
  githubHandler,
};
