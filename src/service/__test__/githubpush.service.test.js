/* eslint-disable no-unused-vars */
jest.mock('redis', () => jest.requireActual('redis-mock'));
const { Octokit } = require('@octokit/core');
const rimraf = require('rimraf');
const githubPushUtils = require('../../utils/pushToGithub');
const redisUtil = require('../../utils/redis.util');
const githubPushServices = require('../githubPush.service');
const {
  Project,
} = require('../../../models');

const mockResponse = { data: { html_url: 'url to pull' } };
jest.mock('@octokit/core', () => ({
  Octokit: jest.fn().mockImplementation(() => (
    { request: jest.fn().mockReturnValue(mockResponse) }
  )),
}));
jest.mock('rimraf');

describe('githubpush service', () => {
  const body = {
    repositoryName: 'abc',
    branchName: 'abc',
    commitMessage: 'abc',
    projectId: 1,
  };

  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  test('Should call pushToGithub function', async () => {
    process.env.PROJECT_PATH = './projectDir';
    const spyOnFindOne = jest.spyOn(Project, 'findOne');
    spyOnFindOne.mockResolvedValue({
      dataValues: {
        name: 'proj1',
      },
    });

    jest.spyOn(redisUtil, 'getAccessToken').mockResolvedValue('token');
    const pushGitSpy = jest.spyOn(githubPushUtils, 'pushToGithub').mockReturnValue();
    await githubPushServices.githubPush(body, 'abc');
    expect(rimraf).toHaveBeenCalledWith('./projectDir/proj1', {}, expect.any(Function));
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
