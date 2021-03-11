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

  it("should go to if block when user is defined and return 'Successfully Logged In!'", async () => {
    const mockRequest = {
      user: { username: 'appy385' },
      headers: { authorization: 'Bearer 113tdajhfbhjbc3265713618nbcjs' },
    };
    const mockReturnValue = {
      user: mockRequest.user,
      message: 'Successfully Logged In!',
      jwtToken: mockRequest.headers.authorization.split(' ')[1],
    };

    await loginHandler(mockRequest, mockResponse);
    expect(mockSend).toHaveBeenCalledWith(mockReturnValue);
  });

  it('should go to catch block when there is no user', async () => {
    const mockRequest = {
    };
    await oauthLoginHandler(mockRequest, mockResponse);
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
    const jwtToken = 'dnkjnvdjksnksd';
    jest.spyOn(service, 'oauthLogin').mockResolvedValue(jwtToken);
    await oauthLoginHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockSend).toHaveBeenCalledWith({ jwtToken });
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
