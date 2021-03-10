const fs = require('../../utils/fileSystem');
const updateHandlerService = require('../generateCode/updateHandler');

describe('Update Handler', () => {
  it('should make function calls in the generated folder handler file', async (done) => {
    const mockComponentList = {
      routes: [{
        routeName: 'flight',
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
          {
            type: 'MAPPER',
            payload: {
              code: 'return getTrivagoPrice < getIbiboPrice ? getTrivagoPrice :  getIbiboPrice',
              nodeModules: {
                lodash: '^4.5.6',
                axios: '^1.2.3',
                express: '^4.17.1',
                'fs-extra': '^9.1.0',
              },
            },
            refName: 'flightsCostMapper',
            sequenceNumber: 3,
            dependencies: ['getTrivagoPrice', 'getIbiboPrice'],
          },
        ],
      }],
    };
    const writeFileSpy = jest.spyOn(fs, 'writeFile');
    const dummyCode = "const getTrivagoPrice = utils.makeApiCall('http://demo1852771.mockable.io/trivago', 'post');\nconst flightsCostMapper = utils.makeMapperCall([getTrivagoPrice,getIbiboPrice], 'return getTrivagoPrice < getIbiboPrice ? getTrivagoPrice :  getIbiboPrice');\n";
    const responseCode = 'res.status(200).send(flightsCostMapper)';
    const handlerDummyData = `const utils = require("../utils/index.js");\nconst flightpostHandler = (req,res) => {\n${dummyCode}${responseCode}};\nmodule.exports = {flightpostHandler, };`;
    writeFileSpy.mockResolvedValue('Success');
    await updateHandlerService.updateHandler('generatedFolder', ['flight'], mockComponentList);
    expect(writeFileSpy).toHaveBeenCalledWith('generatedFolder/src/handlers/flight.handler.js',
      handlerDummyData);
    done();
  });
});
