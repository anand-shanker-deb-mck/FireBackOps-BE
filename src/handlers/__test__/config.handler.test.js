const { storeConfigHandler, updateConfigHandler, deleteConfigHandler } = require('../config.handler');
const configServices = require('../../service/config.service');
const InvalidBodyError = require('../../errors/invalidBody.error');

describe('storeConfig Handler', () => {
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
  const spyOnStoreConfig = jest.spyOn(configServices, 'storeConfig');
  it('should set response status code to 201 and return the data', async () => {
    const MOCK_RESOLVED_VALUE = mockRequest.body;
    spyOnStoreConfig.mockResolvedValue(MOCK_RESOLVED_VALUE);
    await storeConfigHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.status().json).toHaveBeenCalledWith({ data: MOCK_RESOLVED_VALUE });
  });
  it('should set response status code to 500 and return error message if any db error occurs', async () => {
    const MOCK_REJECTED_VALUE = new Error('');
    spyOnStoreConfig.mockRejectedValue(MOCK_REJECTED_VALUE);
    try {
      await storeConfigHandler(mockRequest, mockResponse);
    } catch (error) {
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.status().json).toHaveBeenCalledWith({ message: 'Internal server issues' });
    }
  });
  it('should set response status code to 400 and return error message if body contains any invalid value ', async () => {
    const MOCK_REJECTED_VALUE = new InvalidBodyError('Foreign key violation');
    spyOnStoreConfig.mockRejectedValue(MOCK_REJECTED_VALUE);
    try {
      await storeConfigHandler(mockRequest, mockResponse);
    } catch (error) {
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.status().json).toHaveBeenCalledWith({ message: 'Foreign key violation' });
    }
  });
});
describe('updateConfig Handler', () => {
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
  const spyOnUpdateConfig = jest.spyOn(configServices, 'updateConfig');
  it('should set response status code to 200 and return the data', async () => {
    const MOCK_RESOLVED_VALUE = mockRequest.body;
    spyOnUpdateConfig.mockResolvedValue(MOCK_RESOLVED_VALUE);
    await updateConfigHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.status().json).toHaveBeenCalledWith({ data: MOCK_RESOLVED_VALUE });
  });
  it('should set response status code to 500 and return error message if any db error occurs', async () => {
    const MOCK_REJECTED_VALUE = new Error('');
    spyOnUpdateConfig.mockRejectedValue(MOCK_REJECTED_VALUE);
    try {
      await updateConfigHandler(mockRequest, mockResponse);
    } catch (error) {
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.status().json).toHaveBeenCalledWith({ message: 'Internal server issues' });
    }
  });
  it('should set response status code to 400 and return error message if body contains any invalid value ', async () => {
    const MOCK_REJECTED_VALUE = new InvalidBodyError('Foreign key violation');
    spyOnUpdateConfig.mockRejectedValue(MOCK_REJECTED_VALUE);
    try {
      await updateConfigHandler(mockRequest, mockResponse);
    } catch (error) {
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.status().json).toHaveBeenCalledWith({ message: 'Foreign key violation' });
    }
  });
});

describe('deleteConfig Handler', () => {
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
  const spyOnDeleteConfig = jest.spyOn(configServices, 'deleteConfig');
  it('should set response status code to 201 and return the data', async () => {
    const MOCK_RESOLVED_VALUE = mockRequest.body;
    spyOnDeleteConfig.mockResolvedValue(MOCK_RESOLVED_VALUE);
    await deleteConfigHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.status().json).toHaveBeenCalledWith({ data: MOCK_RESOLVED_VALUE });
  });
  it('should set response status code to 500 and return error message if any db error occurs', async () => {
    const MOCK_REJECTED_VALUE = new Error('');
    spyOnDeleteConfig.mockRejectedValue(MOCK_REJECTED_VALUE);
    try {
      await deleteConfigHandler(mockRequest, mockResponse);
    } catch (error) {
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.status().json).toHaveBeenCalledWith({ message: 'Internal server issues' });
    }
  });
  it('should set response status code to 400 and return error message if body contains any invalid value ', async () => {
    const MOCK_REJECTED_VALUE = new InvalidBodyError('Foreign key violation');
    spyOnDeleteConfig.mockRejectedValue(MOCK_REJECTED_VALUE);
    try {
      await deleteConfigHandler(mockRequest, mockResponse);
    } catch (error) {
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.status().json).toHaveBeenCalledWith({ message: 'Foreign key violation' });
    }
  });
});
