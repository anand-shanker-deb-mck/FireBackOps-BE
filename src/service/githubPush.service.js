const { Octokit } = require('@octokit/core');
const githubPushUtils = require('../utils/pushToGithub');
const redisUtil = require('../utils/redis.util');

const githubPush = (async (body, username) => {
  const {
    repositoryName,
    branchName,
    commitMessage,
  } = body;
  const folders = ['/Users/Asmita_Hajra/FireBackOps-BE/pool'];
  const accessToken = await redisUtil.getAccessToken(username);
  githubPushUtils.pushToGithub(folders,
    accessToken, username, repositoryName, branchName, commitMessage);
});

const githubRaisePullRequest = async (body, username) => {
  const {
    repositoryName,
    prTitle,
    prBody,
    branchName,
  } = body;

  const accessToken = await redisUtil.getAccessToken(username);
  const octokit = new Octokit({ auth: accessToken });
  const response = await octokit.request('POST /repos/{owner}/{repo}/pulls', {
    owner: username,
    repo: repositoryName,
    title: prTitle,
    body: prBody,
    head: branchName,
    base: 'master',
  });

  await octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/assignees', {
    owner: username,
    repo: repositoryName,
    issue_number: response.data.number,
    assignees: [
      username,
    ],
  });
  return response.data.html_url;
};
module.exports = {
  githubPush,
  githubRaisePullRequest,
};
