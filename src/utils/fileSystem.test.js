const fs = require('fs');
const { writeFile } = require('./fileSystem');

describe('Promisified Write File function', () => {
  it('should append data and resolve with success message', () => {
    jest
      .spyOn(fs, 'writeFile')
      .mockImplementation((file, data, option, callback) => {
        callback(null);
      });
    return expect(writeFile('MOCK_FILE', 'MOCK_DATA')).resolves.toBe('Success');
  });
  it('should reject with an error object incase an error occures during appending data', () => {
    const MOCK_ERROR = new Error('An error occured');
    jest
      .spyOn(fs, 'writeFile')
      .mockImplementation((file, data, option, callback) => {
        callback(MOCK_ERROR);
      });
    return expect(writeFile('MOCK_FILE')).rejects.toEqual(
      MOCK_ERROR,
    );
  });
});
