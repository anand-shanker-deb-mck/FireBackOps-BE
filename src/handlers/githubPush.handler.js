/* eslint-disable no-unused-vars */
const githubPushService = require('../service/githubPush.service');

const githubPushHandler = async (req, res) => {
  const { body } = req;
  const {
    accessToken,
    // A different PR will be raised for accessToken
    repositoryName,
    branchName,
    commitMessage,
  } = body;

  // const { username } = req.user;

  try {
    const folders = await githubPushService.getFoldersService();
    // (call to github push function using body and folders)
    res.status(200).send(folders);
  } catch (err) {
    res.status(500).send('Unable to read files');
  }
};

module.exports = { githubPushHandler };
