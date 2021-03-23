const fs = require('fs');
const process = require('process');
const pushFunctions = require('../pushToGithub');

describe('getAllFiles function', () => {
  const mockDir = '/Users/Asmita_Hajra/FireBackOps-BE/abc';
  const mockFiles = ['package.json'];
  const arrayOfFiles = [];
  const expectedValue = ['/Users/Asmita_Hajra/FireBackOps-BE/abc/package.json'];
  const mockStatSyncValue = {
    isDirectory() { return false; },
  };
  it('should return array of files in passed folder', () => {
    const spyOnReaddirSync = jest.spyOn(fs, 'readdirSync');
    spyOnReaddirSync.mockReturnValueOnce(mockFiles);
    const spyOnStatSync = jest.spyOn(fs, 'statSync');
    spyOnStatSync.mockReturnValueOnce(mockStatSyncValue);
    const result = pushFunctions.getAllFilesFunction(mockDir, arrayOfFiles);
    expect(result).toEqual(expectedValue);
  });
});

describe('getAllFileDataFunction', () => {
  const mockAllFiles = ['/Users/Asmita_Hajra/FireBackOps-BEE/abc/package.json'];
  const expectedValue = [{ content: 'dummy', path: 'abc/package.json' }];
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return array of objects having properties content and path', () => {
    jest.spyOn(process, 'cwd').mockReturnValue('/Users/Asmita_Hajra/FireBackOps-BEE');
    jest.spyOn(fs, 'readFileSync').mockReturnValueOnce('dummy');
    const result = pushFunctions.getAllFileDataFunction(mockAllFiles);
    expect(result).toStrictEqual(expectedValue);
  });
});

describe('pushToGithub', () => {
  const mockUsername = 'abc';
  const mockRepoName = 'abcd';
  const mockBranchName = 'main';
  const mockCommitMsg = 'commit';
  const mockFolder = ['/Users/Asmita_Hajra/FireBackOps-BE/abc'];
  const mockAuth = 'auth_abc';
  const mockDataToPush = [{ content: 'dummy', path: 'abc/package.json' }];
  it('pushes folders to github', async () => {
    const mockGithubImplementation = {
      setRepo: jest.fn(),
      setBranch: jest.fn().mockImplementation(() => Promise.resolve()),
      pushFiles: jest.fn(),
    };

    pushFunctions.GithubAPIMethod = jest.fn(() => mockGithubImplementation);

    const spyOnGetAllFilesFunction = jest.spyOn(pushFunctions, 'getAllFilesFunction');
    spyOnGetAllFilesFunction.mockReturnValueOnce(['/Users/Asmita_Hajra/FireBackOps-BE/abc/package.json']);

    const spyOnGetAllFileData = jest.spyOn(pushFunctions, 'getAllFileDataFunction');
    spyOnGetAllFileData.mockReturnValueOnce(mockDataToPush);

    await pushFunctions.pushToGithub(
      mockFolder, mockAuth, mockUsername, mockRepoName, mockBranchName, mockCommitMsg,
    );

    expect(mockGithubImplementation.setRepo).toHaveBeenCalledWith(mockUsername, mockRepoName);
    expect(mockGithubImplementation.setBranch).toHaveBeenCalledWith(mockBranchName);
    expect(mockGithubImplementation.pushFiles).toHaveBeenCalledWith(mockCommitMsg, mockDataToPush);
  });
});
