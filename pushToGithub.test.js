const fs = require('fs');
const pushFunctions = require('./pushToGithub');

describe('getFiles', () => {
  const mockDir = 'handlers';
  const mockFiles = ['health.handler.js'];
  const arrayOfFiles = [];
  const expectedValue = ['handlers/health.handler.js'];
  const mockStatSyncValue = {
    isDirectory() { return false; },
  };
  it('should return array of files in passed folder', () => {
    const spyOnReaddirSync = jest.spyOn(fs, 'readdirSync');
    spyOnReaddirSync.mockReturnValueOnce(mockFiles);
    const spyOnStatSync = jest.spyOn(fs, 'statSync');
    spyOnStatSync.mockReturnValueOnce(mockStatSyncValue);
    const result = pushFunctions.getFiles(mockDir, arrayOfFiles);
    expect(result).toEqual(expectedValue);
  });
});

describe('getAllFilesFunction', () => {
  const mockFolders = ['abc.js'];
  const expectedValue = ['abc.js'];
  const mockstatSyncValue = {
    isFile() { return true; },
  };

  it('should return final array of all files in various directories', () => {
    const spyOnStatSync = jest.spyOn(fs, 'statSync');
    spyOnStatSync.mockReturnValueOnce(mockstatSyncValue);
    const spyOnGetAllFiles = jest.spyOn(pushFunctions, 'getFiles');
    spyOnGetAllFiles.mockReturnValueOnce('handlers/health.handler.js');
    const result = pushFunctions.getAllFilesFunction(mockFolders);
    expect(result).toEqual(expectedValue);
  });
});

describe('getAllFileDataFunction', () => {
  const mockAllFiles = ['handlers/health.handler.js', 'handlers/index.js'];
  const expectedValue = [{ content: 'abc', path: 'handlers/health.handler.js' }, { content: 'def', path: 'handlers/index.js' }];
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return array of objects having properties content and path', () => {
    const spyOnReadFileSync = jest.spyOn(fs, 'readFileSync');
    spyOnReadFileSync.mockReturnValueOnce('abc');
    spyOnReadFileSync.mockReturnValueOnce('def');
    const result = pushFunctions.getAllFileDataFunction(mockAllFiles);
    expect(result).toEqual(expectedValue);
  });
});

describe('pushToGithub', () => {
  const mockUsername = 'abc';
  const mockRepoName = 'abc';
  const mockBranchName = 'main';
  const mockCommitMsg = 'commit';
  const mockFolders = ['handlers'];
  const mockAuth = 'abc';
  const mockDataToPush = [{ content: 'abc', path: 'handlers/health.handler.js' }];
  it('pushes folders to github', async () => {
    const mockGithubImplementation = {
      setRepo: jest.fn(),
      setBranch: jest.fn().mockImplementation(() => Promise.resolve()),
      pushFiles: jest.fn(),
    };
    pushFunctions.GithubAPIMethod = jest.fn(() => mockGithubImplementation);

    const spyOnGetAllFilesFunction = jest.spyOn(pushFunctions, 'getAllFilesFunction');
    spyOnGetAllFilesFunction.mockReturnValueOnce(['handlers/health.handler.js']);

    const spyOnGetAllFileData = jest.spyOn(pushFunctions, 'getAllFileDataFunction');
    spyOnGetAllFileData.mockReturnValueOnce(mockDataToPush);

    await pushFunctions.pushToGithub(
      mockFolders, mockAuth, mockUsername, mockRepoName, mockBranchName, mockCommitMsg,
    );

    expect(mockGithubImplementation.setRepo).toHaveBeenCalledWith(mockUsername, mockRepoName);
    expect(mockGithubImplementation.setBranch).toHaveBeenCalledWith(mockBranchName);
    expect(mockGithubImplementation.pushFiles).toHaveBeenCalledWith(mockCommitMsg, mockDataToPush);
  });
});
