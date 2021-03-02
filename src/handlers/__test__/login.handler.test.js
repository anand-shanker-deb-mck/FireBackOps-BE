const { loginHandler, oauthLoginHandler } = require('../login.handler');
const service = require('../../service/login.service');

describe('loginHandler', () => {
  let mockResponse;
  beforeEach(() => {
    mockResponse = {
      redirect: jest.fn(),
    };
  });
  it('should go to if block where body token is undefined', () => {
    const mockRequest = {
      body: {},
    };
    loginHandler(mockRequest, mockResponse);
    expect(mockResponse.redirect).toHaveBeenCalledWith(`/login.html?client_id=${process.env.CLIENT_ID}`);
  });
});

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
      query: { code: '124512' },
    };
    const token = 'dnkjnvdjksnksd';
    jest.spyOn(service, 'oauthLogin').mockResolvedValue(token);
    await oauthLoginHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockSend).toHaveBeenCalledWith({ JWTtoken: token });
  });
});
