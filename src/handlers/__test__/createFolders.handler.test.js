const createFoldersHandler = require('../createFolders.handler');
const createFoldersService = require('../../service/createFolders.service');

describe('Create Folders handler', () => {
  let mockSend;
  let mockResponse;
  let mockRequest;
  let mockValue;
  beforeEach(() => {
    mockSend = jest.fn();
    mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };
    mockRequest = {
      body: { projectId: 1 },
    };
    mockValue = {
      projectName: 'P1',
      routes: [
        {
          routeName: 'R1',
          configurations: [
            {
              componentType: 'Api',
              payload: {
                method: 'get',
              },
              sequence: 1,
              refName: 'source',
              dependencies: null,
            }],
        }],
    };
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should set status code to 200', async () => {
    const spyGetRouteDetailsService = jest.spyOn(createFoldersService, 'getRouteDetailsService').mockResolvedValue(mockValue);
    await createFoldersHandler.createFoldersHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.status().send).toHaveBeenCalledWith(mockValue);
    expect(spyGetRouteDetailsService).toHaveBeenCalledWith(1);
  });
});

describe('Create Folders handler', () => {
  let mockSend;
  let mockResponse;
  let mockRequest;
  beforeEach(() => {
    mockSend = jest.fn();
    mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };
    mockRequest = {
      body: { projectId: 1 },
    };
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set status code to 500', async () => {
    jest.spyOn(createFoldersService, 'getRouteDetailsService').mockRejectedValue('sj');
    await createFoldersHandler.createFoldersHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.status().send).toHaveBeenCalledWith('Unable to fetch details');
  });
});
