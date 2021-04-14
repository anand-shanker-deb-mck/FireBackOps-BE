jest.mock('redis', () => jest.requireActual('redis-mock'));
const githubPushHandler = require('../githubPush.handler');
const githubPushService = require('../../service/githubPush.service');
const service = require('../../services/generate.service');

describe('Git hub push handler', () => {
  let mockJson;
  let mockResponse;
  let mockRequest;
  beforeEach(() => {
    mockJson = jest.fn();
    mockResponse = {
      status: jest.fn(() => ({ json: mockJson })),
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
    expect(mockJson).toHaveBeenCalledWith('Project got committed successfully on Github');
    expect(spyGitService).toHaveBeenCalled();
  });
  it('should set status code to 500', async () => {
    jest.spyOn(service, 'generateCodeService').mockResolvedValue();
    const spyGetFoldersService = jest.spyOn(githubPushService, 'githubPush').mockRejectedValue({ message: 'abc' });
    await githubPushHandler.githubPushHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({ message: 'abc' });
    expect(spyGetFoldersService).toHaveBeenCalled();
  });
});
