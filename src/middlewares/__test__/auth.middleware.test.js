const jwt = require('jsonwebtoken');
const { TokenExpiredError } = require('jsonwebtoken');
const { authenticateJwt } = require('../auth.middleware');

describe(' authenticateJwt Middleware', () => {
  let mockResponse;
  let mockSend;
  let mockNext;
  beforeEach(() => {
    mockSend = jest.fn();
    mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
      redirect: jest.fn(),
    };
    mockNext = jest.fn();
  });

  it('should go to else when there is no authorization value', () => {
    const mockRequest = {
      headers: { authorization: null },
    };
    authenticateJwt(mockRequest, mockResponse, mockNext);
    expect(mockResponse.redirect).toHaveBeenCalledWith(`/login.html?client_id=${process.env.CLIENT_ID}`);
  });

  it('should go to login page when jwtToken is expired', () => {
    const mockRequest = {
      headers: { authorization: 'Bearer sdfuahsdu283798wqr79' },
    };
    jest.spyOn(jwt, 'verify').mockImplementation((token, secret, callback) => { callback(new TokenExpiredError(), undefined); });
    authenticateJwt(mockRequest, mockResponse, mockNext);
    expect(mockResponse.redirect).toHaveBeenCalledWith(`/login.html?client_id=${process.env.CLIENT_ID}`);
  });

  it('should return with status 401 when called with bad jwtToken ', () => {
    const mockRequest = {
      headers: { authorization: 'Bearer sdfuahsdu283798wqr79' },
    };
    jest.spyOn(jwt, 'verify').mockImplementation((token, secret, callback) => { callback(new Error('error'), undefined); });
    authenticateJwt(mockRequest, mockResponse, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockSend).toHaveBeenCalledWith({ message: 'Unauthenticated' });
  });

  it('should go to next', () => {
    const mockRequest = {
      headers: { authorization: 'Bearer sdfuahsdu283798wqr79' },
    };
    jest.spyOn(jwt, 'verify').mockImplementation((token, secret, callback) => { callback(undefined, { username: 'appy385' }); });
    authenticateJwt(mockRequest, mockResponse, mockNext);
    expect(mockNext).toHaveBeenCalledWith();
  });
});
