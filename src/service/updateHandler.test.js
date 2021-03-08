const fse = require('fs-extra');
const fs = require('../utils/fileSystem');
const updateHandlerService = require('./updateHandler');

describe('Update Handler', () => {
  it('should make function calls in the generated folder handler file', async (done) => {
    const readJsonSpy = jest.spyOn(fse, 'readJson');
    const writeFileSpy = jest.spyOn(fs, 'writeFile');
    const dummyCode = "const func = utils.makeApiCall('api.com', 'GET');\n";
    const handlerDummyData = `const utils = require("../utils/index.js");\nconst handler = (req,res) => {${dummyCode}};\nmodule.exports = handler;\n`;
    readJsonSpy.mockResolvedValue([{
      type: 'API',
      payload: {
        nodeModules: {
          lodash: '^4.5.6',
          eslint: '1.1.1',
        },
        endpoint: 'api.com',
        method: 'GET',
      },
      refName: 'func',
      routeName: 'flight',
    }, { type: 'API' }]);
    writeFileSpy.mockResolvedValue('Success');

    await updateHandlerService.updateHandler('generatedFolder', 'flight', 'dummy.json');
    expect(readJsonSpy).toHaveBeenCalledWith('dummy.json');
    expect(writeFileSpy).toHaveBeenCalledWith('generatedFolder/src/handlers/flight.handler.js',
      handlerDummyData);
    done();
  });
});
