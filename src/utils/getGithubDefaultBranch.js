const { Octokit } = require('@octokit/core');

const getGitHubDefaultBranch = async (accessToken, username, repositoryName) => {
  const octokit = new Octokit({ auth: accessToken });
  const { data } = await octokit.request('GET /repos/{owner}/{repo}', {
    owner: username,
    repo: repositoryName,
  });
  return data.default_branch;
};

module.exports = { getGitHubDefaultBranch };
