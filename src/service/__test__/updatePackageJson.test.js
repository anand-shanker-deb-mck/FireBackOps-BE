const fs = require('../../utils/fileSystem');
const updatePackageJsonService = require('../generateCode/updatePackageJson');
const fileServices = require('../../utils/file.util');

describe('Update package.json dependencies', () => {
  const mockDependencies = { dependencies: { lodash: '4.17.21' } };

  const mockComponentList = {
    routes: [{
      configurations: [
        {
          payload: {
            nodeModules: ['lodash'],
          },
        },
      ],
    }],
  };
  it.only('should get all the node modules and read and update the package.json', async (done) => {
    const readSpy = jest.spyOn(fileServices, 'readFile');
    readSpy.mockResolvedValueOnce('{ "dependencies": {} }');
    const writeFileSpy = jest.spyOn(fs, 'writeFile');
    writeFileSpy.mockResolvedValue('Success');
    await updatePackageJsonService.updatePackageJson('generatedFolder', mockComponentList, 'MOCK_PATH');
    expect(writeFileSpy).toHaveBeenCalledWith('MOCK_PATH/package.json', JSON.stringify(mockDependencies, null, 4));
    done();
  });
});
