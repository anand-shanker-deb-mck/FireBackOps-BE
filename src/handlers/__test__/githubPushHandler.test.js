jest.mock('redis', () => jest.requireActual('redis-mock'));
const githubPushHandler = require('../githubPush.handler');
const githubPushService = require('../../service/githubPush.service');

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
        userName: 'a',
        repositoryName: 'a',
        branchName: 'a',
        commitMessage: 'a',
      },
      user: {
        username: 'abc',
      },
    };
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set status code to 200', async () => {
    const spyGitService = jest.spyOn(githubPushService, 'githubPush').mockReturnValue();
    await githubPushHandler.githubPushHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockSend).toHaveBeenCalledWith('Files committed successfully');
    expect(spyGitService).toHaveBeenCalled();
  });
  it('should set status code to 500', async () => {
    const spyGetFoldersService = jest.spyOn(githubPushService, 'githubPush').mockRejectedValue('error');
    await githubPushHandler.githubPushHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith();
    expect(spyGetFoldersService).toHaveBeenCalled();
  });
});
