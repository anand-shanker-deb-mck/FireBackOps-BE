const githubPushUtils = require('../utils/pushToGithub');
const redisUtil = require('../utils/redis.util');

const githubPush = (async (body, username) => {
  const {
    repositoryName,
    branchName,
    commitMessage,
  } = body;
  const folders = ['/Users/Isha_Deep/Desktop/TECH PROJECT/FireBackOps-BE/generatedFolder'];
  const accessToken = await redisUtil.getAccessToken(username);
  githubPushUtils.pushToGithub(folders,
    accessToken, username, repositoryName, branchName, commitMessage);
});

module.exports = {
  githubPush,
};
