/* eslint-disable no-unused-vars */
const githubPushService = require('../service/githubPush.service');

const githubPushHandler = async (req, res) => {
  const { body } = req;
  const {
    authToken,
    userName,
    repositoryName,
    branchName,
    commitMessage,
  } = body;
  try {
    const folders = await githubPushService.getFoldersService();
    // (call to github push function using body and folders)
    res.status(200).send(folders);
  } catch (err) {
    res.status(500).send('Unable to read files');
  }
};

module.exports = { githubPushHandler };
