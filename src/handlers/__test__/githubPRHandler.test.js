jest.mock('redis', () => jest.requireActual('redis-mock'));
const githubPushService = require('../../service/githubPush.service');
const { githubPRHandler } = require('../githubPR.handler');

describe('Git hub PR handler', () => {
  let mockSend;
  let mockResponse;
  let mockRequest;
  beforeEach(() => {
    mockSend = jest.fn();
    mockResponse = {
      status: jest.fn(() => ({ json: mockSend })),
    };
    mockRequest = {
      body: {
        repositoryName: 'tic-tac-toe',
        prTitle: 'lol',
        prBody: 'lol',
        branchName: 'my-feature-branch',
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
    const spyGitService = jest.spyOn(githubPushService, 'githubRaisePullRequest').mockResolvedValue('pullReqUrl');
    await githubPRHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.status().json).toHaveBeenCalledWith({ url: 'pullReqUrl' });
    expect(spyGitService).toHaveBeenCalled();
  });
  it('should set status code to 500', async () => {
    const spyGetFoldersService = jest.spyOn(githubPushService, 'githubRaisePullRequest').mockRejectedValue('error');
    await githubPRHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.status().json).toHaveBeenCalledWith({ message: 'Internal server error' });
    expect(spyGetFoldersService).toHaveBeenCalled();
  });
});
