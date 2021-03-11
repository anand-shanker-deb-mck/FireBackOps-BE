const fse = require('fs-extra');
const server = require('./generateCommonFunctions');
const apiTemplate = require('../../templates/apiTemplate');
const mapperTemplate = require('../../templates/mapperTemplate');

describe('server test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const inputJsonData = [
    {
      type: 'API',
      payload: {
        endpoint: 'http://demo1852771.mockable.io/ibibo',
        method: 'GET',
        dependencies: [],
        nodeModules: {
          lodash: '^4.5.6',
          eslint: '1.1.1',
        },
      },
      refName: 'getIbiboPrice',
      routeId: 1,
      sequenceNumber: 2,
      routeName: 'flight',
    },
    {
      type: 'MAPPER',
      payload: {
        code: 'return getTrivagoPrice < getIbiboPrice ? getTrivagoPrice :  getIbiboPrice',
        dependencies: ['getTrivagoPrice', 'getIbiboPrice'],
        nodeModules: {
          lodash: '^4.5.6',
          axios: '^1.2.3',
          express: '^4.17.1',
          'fs-extra': '^9.1.0',
        },
      },
      refName: 'flightsCostMapper',
      routeId: 1,
      routeName: 'flight',
      sequenceNumber: 3,
    },
  ];
  const mockApiTemplate = `import axios from Axios;
    const makeApiCall = (url, token) => {
        data
    }`;
  const mockMapperTemplate = ['const makeMapperCall = (abc, code) => {return code}', 'makeGoIbiboCall'];
  it('should be called with template response', async () => {
    jest.spyOn(fse, 'readJson').mockResolvedValue(inputJsonData);
    jest.spyOn(apiTemplate, 'returnApiTemplate').mockImplementation(() => mockApiTemplate);
    jest.spyOn(mapperTemplate, 'returnMapperTemplate').mockImplementation(() => mockMapperTemplate);
    jest.spyOn(fse, 'appendFile').mockResolvedValue('resolved');

    await server.generateCommonFunction('project1');
    expect(fse.appendFile).toHaveBeenCalledWith('project1/src/utils/index.js', mockApiTemplate);
  });
  it('should fail with error message', async () => {
    jest.spyOn(fse, 'readJson').mockRejectedValue(new Error('read file failed'));
    jest.spyOn(apiTemplate, 'returnApiTemplate').mockImplementation(() => mockApiTemplate);
    jest.spyOn(mapperTemplate, 'returnMapperTemplate').mockImplementation(() => mockMapperTemplate);
    jest.spyOn(fse, 'appendFile').mockResolvedValue('resolved');

    const testGenerateCommonFunction = await server.generateCommonFunction('project1');
    expect(testGenerateCommonFunction).toEqual('read file failed');
  });
  it('should fail with error message', async () => {
    jest.spyOn(fse, 'readJson').mockResolvedValue(inputJsonData);
    jest.spyOn(apiTemplate, 'returnApiTemplate').mockImplementation(() => mockApiTemplate);
    jest.spyOn(mapperTemplate, 'returnMapperTemplate').mockImplementation(() => mockMapperTemplate);
    jest.spyOn(fse, 'appendFile').mockRejectedValue(new Error('read file failed'));

    const testGenerateCommonFunction = await server.generateCommonFunction('project1');
    expect(testGenerateCommonFunction).toEqual('read file failed');
  });
});
