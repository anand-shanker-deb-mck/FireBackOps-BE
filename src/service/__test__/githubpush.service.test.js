const getFoldersService = require('../githubPush.service');
const fileUtils = require('../../utils/file.util');

describe('Get folders service', () => {
  it('should return the folders name from the file', async () => {
    jest.spyOn(fileUtils, 'readFile').mockResolvedValue('abc,def');
    const folders = await getFoldersService.getFoldersService();
    expect(folders).toEqual(['abc', 'def']);
  });
});
