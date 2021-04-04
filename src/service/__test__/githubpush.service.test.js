/* eslint-disable no-unused-vars */
jest.mock('redis', () => jest.requireActual('redis-mock'));
jest.mock('@octokit/core');
const { Octokit } = require('@octokit/core');
const githubPushUtils = require('../../utils/pushToGithub');
const redisUtil = require('../../utils/redis.util');
const githubPushServices = require('../githubPush.service');

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
  const octokit = { request: jest.fn() };
  const mockResponse = { data: { html_url: 'url to pull' } };
  test('Raise pull request on call', async () => {
    // jest.spyOn(redisUtil, 'getAccessToken').mockResolvedValue(token);
    // const octokit = new Octokit({ auth: token });
    // jest.spyOn(octokit, 'request').mockResolvedValue(mockResponse);
    // const pullReqUrl = await githubPushServices.githubRaisePullRequest(body, 'abc');
    // expect(pullReqUrl).toBe('url to pull');
  });
});
