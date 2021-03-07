const fs = require('fs');
const fileUtils = require('../file.utils');

describe('The function read file', () => {
  it('Unit iting should return files content', () => {
    jest
      .spyOn(fs, 'readFile')
      .mockImplementation((file, option, callback) => {
        callback(null, 'read File content');
      });
    return expect(fileUtils.readFile('../seed/')).resolves.toBe('read File content');
  });
  it('Unit it should reject file data read request', () => {
    jest.spyOn(fs, 'readFile')
      .mockImplementation((file, option, cb) => {
        cb('reject read file content request', null);
      });
    return expect(fileUtils.readFile('../seed1/')).rejects.toEqual('reject read file content request');
  });
});
