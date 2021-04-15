const { oauthLoginHandler } = require('../login.handler');

jest.mock('redis', () => jest.requireActual('redis-mock'));
const service = require('../../services/login.service');

// ---------------- oauthLoginHandler------------------------------------------//
describe('oauthLoginHandler', () => {
  let mockSend;
  let mockResponse;
  beforeEach(() => {
    mockSend = jest.fn();
    mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };
  });

  it('should return with status 200 and jwt token', async () => {
    const mockRequest = {
      body: { code: '124512' },
    };
    const jwtToken = 'dnkjnvdjksnksd';
    const username = 'srishti';
    jest.spyOn(service, 'oauthLogin').mockResolvedValue({ jwtToken, username });
    await oauthLoginHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockSend).toHaveBeenCalledWith({ jwtToken, username });
  });

  it('should go to catch block when service throws error ', async () => {
    const mockRequest = {
      body: { code: '124512' },
    };
    jest.spyOn(service, 'oauthLogin').mockImplementation(() => { throw new Error('error'); });
    await oauthLoginHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith();
  });
});
