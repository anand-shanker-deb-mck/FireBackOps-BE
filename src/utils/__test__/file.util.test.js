const fs = require('fs');
const { readFile, writeFile } = require('../file.util');

describe('readFile', () => {
  it("should resolve with value 'this is async'", () => {
    jest.spyOn(fs, 'readFile')
      .mockImplementation((path, options, callback) => {
        callback(null, 'this is async');
      });
    return expect(readFile()).resolves.toBe('this is async');
  });

  it("should reject with error message 'error' ", () => {
    jest.spyOn(fs, 'readFile')
      .mockImplementation((path, options, callback) => {
        callback(new Error('error'), null);
      });
    return expect(readFile()).rejects.toEqual(Error('error'));
  });
});

describe('writeFile', () => {
  it("should resolve with value 'finish'", () => {
    jest.spyOn(fs, 'writeFile')
      .mockImplementation((path, options, callback) => {
        callback(null);
      });
    return expect(writeFile()).resolves.toBe('finish');
  });

  it("should reject with error message 'error' ", () => {
    jest.spyOn(fs, 'writeFile')
      .mockImplementation((path, options, callback) => {
        callback(new Error('error'));
      });
    return expect(writeFile()).rejects.toEqual(Error('error'));
  });
});
