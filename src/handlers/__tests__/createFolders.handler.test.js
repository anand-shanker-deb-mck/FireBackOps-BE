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

    mockValue = [{ name: 'r1' }, { name: 'r3' }];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set status code to 200', async () => {
    const spyGetProjectName = jest.spyOn(createFoldersService, 'getProjectName').mockResolvedValue('P1');
    const spyGetRouteNamesService = jest.spyOn(createFoldersService, 'getRouteNamesService').mockResolvedValue(mockValue);
    await createFoldersHandler.createFoldersHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.status().send).toHaveBeenCalledWith(['r1', 'r3']);
    expect(spyGetProjectName).toHaveBeenCalledWith(1);
    expect(spyGetRouteNamesService).toHaveBeenCalledWith(1);
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
    const spyGetProjectName = jest.spyOn(createFoldersService, 'getProjectName').mockRejectedValue('Unable to fetch details');
    jest.spyOn(createFoldersService, 'getRouteNamesService').mockResolvedValue('sj');
    await createFoldersHandler.createFoldersHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.status().send).toHaveBeenCalledWith('Unable to fetch details');
    expect(spyGetProjectName).toHaveBeenCalledWith(1);
  });
});
