const fse = require('fs-extra');
const fs = require('../utils/fileSystem');
const updatePackageJsonService = require('./updatePackageJson');

describe('Update package.json dependencies', () => {
  it('should get all the node modules and read and update the package.json', async (done) => {
    const readSpy = jest.spyOn(fse, 'readJson');
    readSpy.mockResolvedValueOnce([{
      type: 'API',
      payload: {
        nodeModules: {
          lodash: '^4.5.6',
          eslint: '1.1.1',
        },
      },
    }]).mockResolvedValueOnce({ dependencies: {} });
    const writeFileSpy = jest.spyOn(fs, 'writeFile');
    writeFileSpy.mockResolvedValue('Success');
    await updatePackageJsonService.updatePackageJson('generatedFolder');
    expect(writeFileSpy).toHaveBeenCalledWith('generatedFolder/package.json', `{
    "dependencies": {
        "lodash": "^4.5.6",
        "eslint": "1.1.1"
    }
}`);
    done();
  });
});
