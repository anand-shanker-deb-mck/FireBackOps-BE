const generateService = require('../generate.service');
const createFolderService = require('../../service/createFolders.service');
const generateCode = require('../../service/index');

describe('tests for generate', () => {
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
  test('should generate code', async () => {
    jest.spyOn(createFolderService, 'getRouteDetailsService').mockResolvedValue(mockResult);
    jest.spyOn(generateCode, 'updateHandlerAndDependency').mockResolvedValue();
    await generateService.generateCodeService('1', './projectDir');
  });
});
