const jwt = require('jsonwebtoken');

jest.mock('redis', () => jest.requireActual('redis-mock'));
const { oauthLogin } = require('../login.service');
const githubApiUtil = require('../../utils/github.api.util');
const userUtils = require('../../utils/user.utils');

describe('oauthLogin', () => {
  afterEach(() => jest.clearAllMocks());
  it('should return jwtToken ', async () => {
    const mockAccessToken = 'dsbvyubdsbvsuvdsbk';
    const mockUsername = 'abc';
    const mockJWTToken = '348yr834yt834yt83utirir';
    const mockCode = '73582375278';
    const mockUser = [
      {
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
      false,
    ];

    const getTokenSpy = jest.spyOn(githubApiUtil, 'getToken');
    getTokenSpy.mockResolvedValue(mockAccessToken);

    const getUsernameSpy = jest.spyOn(githubApiUtil, 'getUserName');
    getUsernameSpy.mockResolvedValue(mockUsername);

    jest.spyOn(userUtils, 'createUser').mockResolvedValue(mockUser);

    const jwtSignSpy = jest.spyOn(jwt, 'sign');
    jwtSignSpy.mockResolvedValue(mockJWTToken);

    const response = await oauthLogin(mockCode);
    expect(response).toBe(mockJWTToken);
    expect(getUsernameSpy).toHaveBeenCalledWith(mockAccessToken);
    expect(jwtSignSpy).toHaveBeenCalledWith({
      username: mockUsername,
      id: mockUser[0].dataValues.id,
    },
    process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY_TIME });
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
