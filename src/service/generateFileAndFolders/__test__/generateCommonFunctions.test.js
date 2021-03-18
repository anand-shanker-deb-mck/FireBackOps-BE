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

  const mockApiTemplate = `import axios from Axios;
    const makeApiCall = (url, token) => {
        data
    }`;
  const mockMapperTemplate = ['const makeMapperCall = (abc, code) => {return code}', 'makeGoIbiboCall'];
  it('should be called with template response', async () => {
    jest.spyOn(fse, 'readJson').mockResolvedValue(mockInputData.inputJsonData);
    jest.spyOn(apiTemplate, 'returnApiTemplate').mockImplementation(() => mockApiTemplate);
    jest.spyOn(mapperTemplate, 'returnMapperTemplate').mockImplementation(() => mockMapperTemplate);
    jest.spyOn(fse, 'appendFile').mockResolvedValue('resolved');
    await server.generateCommonFunction('project1');
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

    const testGenerateCommonFunction = await server.generateCommonFunction('project1');
    expect(testGenerateCommonFunction).toEqual('read file failed');
  });

  it('should fail with error message', async () => {
    jest.spyOn(fse, 'readJson').mockResolvedValue(mockInputData.inputJsonData);
    jest.spyOn(apiTemplate, 'returnApiTemplate').mockImplementation(() => mockApiTemplate);
    jest.spyOn(mapperTemplate, 'returnMapperTemplate').mockImplementation(() => mockMapperTemplate);
    jest.spyOn(fse, 'appendFile').mockRejectedValue(new Error('failed'));
    const testGenerateCommonFunction = await server.generateCommonFunction('project1');
    expect(testGenerateCommonFunction).toEqual('failed');
  });
});
