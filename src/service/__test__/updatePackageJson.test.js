const fse = require('fs-extra');
const fs = require('../../utils/fileSystem');
const updatePackageJsonService = require('../generateCode/updatePackageJson');

describe('Update package.json dependencies', () => {
  const mockDependencies = { dependencies: { lodash: '^4.5.6' } };

  const mockComponentList = {
    routes: [{
      configurations: [
        {
          payload: {
            nodeModules: { lodash: '^4.5.6' },
          },
        },
      ],
    }],
  };
  it('should get all the node modules and read and update the package.json', async (done) => {
    const readSpy = jest.spyOn(fse, 'readJson');
    readSpy.mockResolvedValueOnce({ dependencies: {} });
    const writeFileSpy = jest.spyOn(fs, 'writeFile');
    writeFileSpy.mockResolvedValue('Success');
    await updatePackageJsonService.updatePackageJson('generatedFolder', mockComponentList, 'projectPath');
    expect(writeFileSpy).toHaveBeenCalledWith('projectPath/package.json', JSON.stringify(mockDependencies, null, 4));
    done();
  });
});
