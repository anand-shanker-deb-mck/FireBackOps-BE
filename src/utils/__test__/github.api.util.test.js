const axios = require('axios').default;
const { getToken, getUserName } = require('../github.api.util');

describe('getToken', () => {
  it('should resolve with access token', async () => {
    const accessToken = 'jabsfhj473y648';
    const axiosResponse = {
      data: {
        access_token: accessToken,
      },
    };

    jest.spyOn(axios, 'post').mockResolvedValue(axiosResponse);

    const response = await getToken();
    expect(response).toBe(accessToken);
  });
  it('should reject with message error', async () => {
    jest.spyOn(axios, 'post').mockImplementation(() => { throw new Error('error'); });
    try {
      await getToken();
    } catch (error) {
      expect(error.message).toBe('error');
    }
  });
});

describe('getUserName', () => {
  it('should resolve with access token', async () => {
    const username = 'appy385';
    const axiosResponse = {
      data: {
        login: username,
      },
    };

    jest.spyOn(axios, 'get').mockResolvedValue(axiosResponse);

    const response = await getUserName();
    expect(response).toBe(username);
  });
  it('should reject with message error', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => { throw new Error('error'); });
    try {
      await getUserName();
    } catch (error) {
      expect(error.message).toBe('error');
    }
  });
});
