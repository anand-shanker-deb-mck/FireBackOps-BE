const jwt = require('jsonwebtoken');

jest.mock('redis', () => jest.requireActual('redis-mock'));
const { oauthLogin } = require('../login.service');
const githubApiUtil = require('../../utils/github.api.util');
const userUtils = require('../../utils/user.utils');

describe('oauthLogin', () => {
  afterEach(() => jest.clearAllMocks());
  it('should return jwtToken ', async () => {
    const mockAccessToken = 'dsbvyubdsbvsuvdsbk';
    const mockUsername = 'appy385';
    const mockJWTToken = '348yr834yt834yt83utirir';
    const mockCode = '73582375278';
    const mockUser = [{
      User: {
        dataValues: {
          id: 13,
          userName: 'abc',
          updatedAt: '2021-03-12T12:54:20.461Z',
          createdAt: '2021-03-12T12:54:20.461Z',
          displayName: null,
        },
        _previousDataValues: {
          userName: 'abc',
          id: 13,
          displayName: null,
          createdAt: '2021-03-12T12:54:20.461Z',
          updatedAt: '2021-03-12T12:54:20.461Z',
        },
        _options: {
          isNewRecord: true,
          _schema: null,
          _schemaDelimiter: '',
          attributes: undefined,
          include: undefined,
          raw: undefined,
          silent: undefined,
        },
        isNewRecord: false,
      },
    }];

    const getTokenSpy = jest.spyOn(githubApiUtil, 'getToken');
    getTokenSpy.mockResolvedValue(mockAccessToken);

    const getUsernameSpy = jest.spyOn(githubApiUtil, 'getUserName');
    getUsernameSpy.mockResolvedValue(mockUsername);

    jest.spyOn(userUtils, 'createUser').mockResolvedValue(mockUser);

    jest.spyOn(jwt, 'sign').mockResolvedValue(mockJWTToken);

    const response = await oauthLogin(mockCode);
    expect(response).toBe(mockJWTToken);
    expect(getUsernameSpy).toHaveBeenCalledWith(mockAccessToken);
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
