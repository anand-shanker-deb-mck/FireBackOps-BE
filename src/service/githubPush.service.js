const { Octokit } = require('@octokit/core');
const rimraf = require('rimraf');
const { getGitHubDefaultBranch } = require('../utils/getGithubDefaultBranch');
const githubPushUtils = require('../utils/pushToGithub');
const redisUtil = require('../utils/redis.util');
const {
  Project,
} = require('../../models');

const githubPush = (async (body, username) => {
  const {
    repositoryName,
    branchName,
    commitMessage,
    projectId,
  } = body;
  const projectDetails = await Project.findOne({
    where: {
      id: projectId,
    },
  });
  const projectName = projectDetails.dataValues.name;
  const basePath = process.env.PROJECT_PATH;
  const pathToProject = `${basePath}/${projectName}`;
  const folder = pathToProject;
  const accessToken = await redisUtil.getAccessToken(username);
  await githubPushUtils.pushToGithub(folder,
    accessToken, username, repositoryName, branchName, commitMessage, projectName);
  console.log(`folder${folder}`);
  rimraf(folder, {}, () => {});
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
  const baseBranch = await getGitHubDefaultBranch(accessToken, username, repositoryName);
  const response = await octokit.request('POST /repos/{owner}/{repo}/pulls', {
    owner: username,
    repo: repositoryName,
    title: prTitle,
    body: prBody,
    head: branchName,
    base: baseBranch,
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
