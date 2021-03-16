const { storeCustomCompHandler } = require('../customComp.handler');
const customCompServices = require('../../service/customComp.service');
const InvalidBodyError = require('../../errors/invalidBody.error');

describe('storeCustomComp Handler', () => {
  const mockJson = jest.fn();
  const mockResponse = {
    status: jest.fn(() => ({ json: mockJson })),
  };
  const mockRequest = {
    body: ['MOCK_DATA'],
  };
  afterAll(() => {
    jest.clearAllMocks();
  });
  const spyOnStoreCustomComp = jest.spyOn(customCompServices, 'storeCustomComp');
  it('should set response status code to 201 and return the data', async () => {
    const MOCK_RESOLVED_VALUE = mockRequest.body;
    spyOnStoreCustomComp.mockResolvedValue(MOCK_RESOLVED_VALUE);
    await storeCustomCompHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.status().json).toHaveBeenCalledWith({ data: MOCK_RESOLVED_VALUE });
  });
  it('should set response status code to 500 and return error message if any db error occurs', async () => {
    const MOCK_REJECTED_VALUE = new Error('');
    spyOnStoreCustomComp.mockRejectedValue(MOCK_REJECTED_VALUE);
    try {
      await storeCustomCompHandler(mockRequest, mockResponse);
    } catch (error) {
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.status().json).toHaveBeenCalledWith({ message: 'Internal server issues' });
    }
  });
  it('should set response status code to 400 and return error message if body contains any invalid value ', async () => {
    const MOCK_REJECTED_VALUE = new InvalidBodyError('Foreign key violation');
    spyOnStoreCustomComp.mockRejectedValue(MOCK_REJECTED_VALUE);
    try {
      await storeCustomCompHandler(mockRequest, mockResponse);
    } catch (error) {
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.status().json).toHaveBeenCalledWith({ message: 'Foreign key violation' });
    }
  });
});
