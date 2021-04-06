/* eslint-disable no-unused-vars */
jest.mock('redis', () => jest.requireActual('redis-mock'));
const { Octokit } = require('@octokit/core');
const githubPushUtils = require('../../utils/pushToGithub');
const redisUtil = require('../../utils/redis.util');
const githubPushServices = require('../githubPush.service');

const mockResponse = { data: { html_url: 'url to pull' } };
jest.mock('@octokit/core', () => ({
  Octokit: jest.fn().mockImplementation(() => (
    { request: jest.fn().mockReturnValue(mockResponse) }
  )),
}));

describe('githubpush service', () => {
  const body = {
    repositoryName: 'abc',
    branchName: 'abc',
    commitMessage: 'abc',
  };

  test('Should call pushToGithub function', async () => {
    jest.spyOn(redisUtil, 'getAccessToken').mockResolvedValue('token');
    const pushGitSpy = jest.spyOn(githubPushUtils, 'pushToGithub').mockReturnValue();
    await githubPushServices.githubPush(body, 'abc');
    expect(pushGitSpy).toHaveBeenCalled();
  });
});

describe('github raise pr', () => {
  const body = {
    repositoryName: 'Repo_Name',
    prTitle: 'Title_PR',
    prBody: 'PR_Body',
    branchName: 'feature-branch',
  };
  const token = 'dummy_token';

  test('Raise pull request on call', async () => {
    jest.spyOn(redisUtil, 'getAccessToken').mockResolvedValue(token);
    const ocktokit = new Octokit({ auth: token });
    const spyOnOctokit = jest.spyOn(ocktokit, 'request').mockResolvedValue(mockResponse);
    const pullReqUrl = await githubPushServices.githubRaisePullRequest(body, 'abc');
    expect(pullReqUrl).toBe('url to pull');
  });
});
