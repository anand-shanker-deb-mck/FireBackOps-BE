jest.mock('redis', () => jest.requireActual('redis-mock'));
const githubPushHandler = require('../githubPush.handler');
const githubPushService = require('../../service/githubPush.service');
const service = require('../../services/generate.service');

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
        projecId: 1,
      },
      user: {
        username: 'abc',
      },
    };
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should call the generate code service with project id', async () => {
    const spyGenerateService = jest.spyOn(service, 'generateCodeService').mockResolvedValue();
    jest.spyOn(githubPushService, 'githubPush').mockReturnValue();
    await githubPushHandler.githubPushHandler(mockRequest, mockResponse);
    expect(spyGenerateService).toHaveBeenCalledWith(mockRequest.body.projectId);
  });

  it('should set status code to 200', async () => {
    jest.spyOn(service, 'generateCodeService').mockResolvedValue();
    const spyGitService = jest.spyOn(githubPushService, 'githubPush').mockReturnValue();
    await githubPushHandler.githubPushHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockSend).toHaveBeenCalledWith('Project got committed successfully on Github');
    expect(spyGitService).toHaveBeenCalled();
  });
  it('should set status code to 500', async () => {
    jest.spyOn(service, 'generateCodeService').mockResolvedValue();
    const spyGetFoldersService = jest.spyOn(githubPushService, 'githubPush').mockRejectedValue('error');
    await githubPushHandler.githubPushHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith();
    expect(spyGetFoldersService).toHaveBeenCalled();
  });
});
