const { Octokit } = require('@octokit/core');
const { getGitHubDefaultBranch } = require('../getGithubDefaultBranch');

const mockResponse = { data: { default_branch: 'main' } };
jest.mock('@octokit/core', () => ({
  Octokit: jest.fn().mockImplementation(() => (
    { request: jest.fn().mockReturnValue(mockResponse) }
  )),
}));

describe('getGitHubDefaultBranch', () => {
  it('should return the default/base branch name', async () => {
    const mockToken = 'abhjgsh102894897jhuyw';
    const ocktokit = new Octokit({ auth: mockToken });
    jest.spyOn(ocktokit, 'request').mockResolvedValue(mockResponse);
    const defaultBranch = await getGitHubDefaultBranch(mockToken, 'Mock_Username', 'Mock_Reponame');
    expect(defaultBranch).toBe(mockResponse.data.default_branch);
  });
});
