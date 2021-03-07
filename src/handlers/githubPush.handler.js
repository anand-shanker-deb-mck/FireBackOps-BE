const githubPushService = require('../service/githubPush.service');

const githubPushHandler = async (req, res) => {
//   const { body } = req;
//   const {
//     authToken,
//     userName,
//     repositoryName,
//     branchName,
//     commitMessage,
//   } = body;
  const folders = await githubPushService.getFoldersService();
  res.status(201).send(folders);
};

module.exports = { githubPushHandler };
