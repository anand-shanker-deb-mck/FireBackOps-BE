jest.mock('redis', () => jest.requireActual('redis-mock'));
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
