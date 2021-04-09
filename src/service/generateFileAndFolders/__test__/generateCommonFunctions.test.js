const fse = require('fs-extra');
const server = require('../generateCommonFunctions');
const mockInputData = require('./mockInputData');
const apiTemplate = require('../../../templates/apiTemplate');
const mapperTemplate = require('../../../templates/mapperTemplate');
const { prettifyJsText } = require('../../../utils/jsFormatter');

describe('server test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  let mockResult;
  beforeAll(() => {
    mockResult = {
      projectName: 'Project1',
      routes: [
        {
          name: 'R1',
          method: 'get',
          end_point: '/',
          r_config: { body: { args: 'project1' }, Params: { routeId: '1' } },
          configurations: [
            {
              componentType: 'MAPPER',
              payload: [{
                code: 'console.log("Hello World")',
                nodeModules: ['axioddd', 'numberq'],
              }],
              sequence: 2,
              refName: 'refN2',
              dependencies: ['refN1'],
            },
          ],
        },
      ],
    };
  });
  const mockApiTemplate = `import axios from Axios;
    const makeApiCall = (url, token) => {
        data
    }`;
  const mockMapperTemplate = ['const makeMapperCall = (abc, code) => {return code}', 'makeGoIbiboCall'];
  it('should be called with template response', async () => {
    jest.spyOn(fse, 'readJson').mockResolvedValue(mockResult);
    jest.spyOn(apiTemplate, 'returnApiTemplate').mockImplementation(() => mockApiTemplate);
    jest.spyOn(mapperTemplate, 'returnMapperTemplate').mockImplementation(() => mockMapperTemplate);
    jest.spyOn(fse, 'appendFile').mockResolvedValue('resolved');
    await server.generateCommonFunction('project1', 'projectPath', mockResult);
    const finalMapperContent = `${mockMapperTemplate[0]}\n\nmodule.exports = { ${mockMapperTemplate[1]}, }`;
    await expect(fse.appendFile).toHaveBeenNthCalledWith(1, 'project1/src/services/flightsCostMapper.service.js', prettifyJsText(finalMapperContent));
    const customMapperData = 'const customMapper = (source, destination) => source < destination ? source : destination;';
    await expect(fse.appendFile).toHaveBeenNthCalledWith(2, 'project1/src/services/customHotelCostMapper.service.js', prettifyJsText(customMapperData));
    await expect(fse.appendFile).toHaveBeenNthCalledWith(3, 'project1/src/utils/index.js', mockApiTemplate);
  });
  it('should fail with error message', async () => {
    jest.spyOn(fse, 'readJson').mockRejectedValue(new Error('read file failed'));
    jest.spyOn(apiTemplate, 'returnApiTemplate').mockImplementation(() => mockApiTemplate);
    jest.spyOn(mapperTemplate, 'returnMapperTemplate').mockImplementation(() => mockMapperTemplate);
    jest.spyOn(fse, 'appendFile').mockResolvedValue('resolved');

    const testGenerateCommonFunction = await server.generateCommonFunction('project1', 'projectPath', mockResult);
    expect(testGenerateCommonFunction).toEqual('read file failed');
  });

  it('should fail with error message', async () => {
    jest.spyOn(fse, 'readJson').mockResolvedValue(mockResult);
    jest.spyOn(apiTemplate, 'returnApiTemplate').mockImplementation(() => mockApiTemplate);
    jest.spyOn(mapperTemplate, 'returnMapperTemplate').mockImplementation(() => mockMapperTemplate);
    jest.spyOn(fse, 'appendFile').mockRejectedValue(new Error('failed'));
    const testGenerateCommonFunction = await server.generateCommonFunction('project1', 'projectPath', mockResult);
    expect(testGenerateCommonFunction).toEqual('failed');
  });
});
