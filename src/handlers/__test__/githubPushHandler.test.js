const githubPushHandler = require('../githubPush.handler');
const githubPushService = require('../../service/githubPush.service');

describe('Git hub push handler', () => {
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
      body: {
        authToken: 'a',
        userName: 'a',
        repositoryName: 'a',
        branchName: 'a',
        commitMessage: 'a',
      },
    };
    mockValue = ['routes', 'handlers'];
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set status code to 200', async () => {
    const spyGetFoldersService = jest.spyOn(githubPushService, 'getFoldersService').mockResolvedValue(mockValue);
    await githubPushHandler.githubPushHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.status().send).toHaveBeenCalledWith(mockValue);
    expect(spyGetFoldersService).toHaveBeenCalled();
  });
});

describe('Git hub push handler', () => {
  let mockSend;
  let mockResponse;
  let mockRequest;
  beforeEach(() => {
    mockSend = jest.fn();
    mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };
    mockRequest = {
      body: {
        authToken: 'a',
        userName: 'a',
        repositoryName: 'a',
        branchName: 'a',
        commitMessage: 'a',
      },
    };
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set status code to 500', async () => {
    const spyGetFoldersService = jest.spyOn(githubPushService, 'getFoldersService').mockRejectedValue('error');
    await githubPushHandler.githubPushHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.status().send).toHaveBeenCalledWith('Unable to read files');
    expect(spyGetFoldersService).toHaveBeenCalled();
  });
});
