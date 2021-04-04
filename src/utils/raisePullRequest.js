const { Octokit } = require('@octokit/core');

const raisePR = async () => {
  const octokit = new Octokit({ auth: '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' });
  const owner = 'Meghan1202';
  const repo = 'tic-tac-toe';
  const title = 'My Test Pull Request';
  const body = 'This pull request is a test!';
  const head = 'my-feature-branch';
  const base = 'master';

  const response = await octokit.request('POST /repos/{owner}/{repo}/pulls', {
    owner,
    repo,
    title,
    body,
    head,
    base,
  });
  console.log(response.data.html_url);
  await octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/assignees', {
    owner: 'Meghan1202',
    repo: 'tic-tac-toe',
    issue_number: response.data.number,
    assignees: [
      owner,
    ],
  });
};

raisePR();
