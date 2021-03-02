const jwt = require('jsonwebtoken');
const { oauthLogin } = require('../login.service');
const fileUtil = require('../../utils/file.util');
const githubApiUtil = require('../../utils/github.api.util');

describe('oauthLogin', () => {
  it('should return jwtToken ', async () => {
    const mockAccessToken = 'dsbvyubdsbvsuvdsbk';
    const mockUsername = 'appy385';
    const mockJWTToken = '348yr834yt834yt83utirir';
    const mockCode = '73582375278';
    const getTokenSpy = jest.spyOn(githubApiUtil, 'getToken');
    getTokenSpy.mockResolvedValue(mockAccessToken);
    const getUsernameSpy = jest.spyOn(githubApiUtil, 'getUserName');
    getUsernameSpy.mockResolvedValue(mockUsername);
    const writeFileSpy = jest.spyOn(fileUtil, 'writeFile');
    writeFileSpy.mockResolvedValue();
    jest.spyOn(jwt, 'sign').mockResolvedValue(mockJWTToken);

    const response = await oauthLogin(mockCode);
    expect(response).toBe(mockJWTToken);
    expect(getUsernameSpy).toHaveBeenCalledWith(mockAccessToken);
    expect(writeFileSpy).toHaveBeenCalledWith('accessToken.txt', `${mockUsername} ${mockAccessToken}`);
  });
  it('should throw error with invalid api call', async () => {
    const errorMessage = 'Invalid API Call';
    const mockCode = '73582375278';
    jest.spyOn(githubApiUtil, 'getToken').mockImplementation(() => { throw new Error(errorMessage); });
    try {
      await oauthLogin(mockCode);
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
  });
});
