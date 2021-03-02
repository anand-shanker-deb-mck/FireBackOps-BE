const { loginHandler, oauthLoginHandler } = require('../login.handler');
const service = require('../../service/login.service');

// ---------------- loginHandler-------------------------------------------//
describe('loginHandler', () => {
  let mockResponse;
  let mockSend;
  beforeEach(() => {
    mockSend = jest.fn();
    mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
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

  it('should go to catch block when there is no body', () => {
    const mockRequest = {
    };
    loginHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith();
  });
});

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
      query: { code: '124512' },
    };
    const token = 'dnkjnvdjksnksd';
    jest.spyOn(service, 'oauthLogin').mockResolvedValue(token);
    await oauthLoginHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockSend).toHaveBeenCalledWith({ JWTtoken: token });
  });

  it('should go to catch block when service throws error ', async () => {
    const mockRequest = {
      query: { code: '124512' },
    };
    jest.spyOn(service, 'oauthLogin').mockImplementation(() => { throw new Error('error'); });
    await oauthLoginHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith();
  });
});
