const fs = require('../../utils/fileSystem');
const updateRouteService = require('../generateCode/updateRoutes');

describe('Update routes of generated folder', () => {
  const mockComponentList = {
    routes: [{
      routeName: 'dummyRoute',
      method: 'POST',
      configuration: [
        {
          type: 'API',
          payload: {
            endpoint: 'http://demo1852771.mockable.io/trivago',
            method: 'POST',
            nodeModules: { lodash: '^4.5.6', axios: '^1.2.3' },
          },
          dependencies: [],
          refName: 'getTrivagoPrice',
          sequenceNumber: 1,
        },
      ],
    }],
  };
  const mockWriteInput = `const express = require('express');
  const dummyRouteHandler = require('../handlers/dummyRoute.handler.js');\n
  const dummyRouteRouter = express.Router();\n\n
  module.exports = {
    dummyRouteRouter,
  };
  `;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should append the routes to the corresponding file', async (done) => {
    const writeFileSpy = jest.spyOn(fs, 'writeFile');
    writeFileSpy.mockResolvedValue('Success');
    await updateRouteService.updateRoutes('dummyFolder', ['dummyRoute'], mockComponentList, './projectDir');
    expect(writeFileSpy).toHaveBeenCalledWith('./projectDir/src/routes/dummyRoute.route.js', mockWriteInput);
    done();
  });
});

describe('Update index of routes folder', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should update the indeex of the corresponding routes file', async (done) => {
    const writeFileSpy = jest.spyOn(fs, 'writeFile');
    writeFileSpy.mockResolvedValue('Success');
    await updateRouteService.updateRouteIndex('dummyFolder', ['dummyRoute'], './projectDir');
    expect(writeFileSpy).toHaveBeenCalledWith('./projectDir/src/routes/index.js', `const { dummyRouteRouter } = require('./dummyRoute.route');\n
module.exports = { dummyRouteRouter };\n`);
    done();
  });
});
