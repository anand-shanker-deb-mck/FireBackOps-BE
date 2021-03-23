jest.mock('redis', () => jest.requireActual('redis-mock'));
const { getAccessToken } = require('../redis.util');
const { redisClient } = require('../../redis');

describe('get Access Token Util', () => {
  it('should throw error when username does not exist in redis cache', async () => {
    const mockUsername = '161t2357647325';
    jest.spyOn(redisClient, 'get').mockImplementation((username, callback) => { callback(new Error('error'), undefined); });
    try {
      await getAccessToken(mockUsername);
    } catch (error) {
      expect(error.message).toEqual('error');
    }
  });
  it('should return accessToken', async () => {
    const mockUsername = 'appy385';
    const mockAccessToken = 'dsbhfjvdbsjvsd';
    jest.spyOn(redisClient, 'get').mockImplementation((username, callback) => { callback(undefined, mockAccessToken); });
    const data = await getAccessToken(mockUsername);
    expect(data).toBe(mockAccessToken);
  });
});
