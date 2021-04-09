const fs = require('../../utils/fileSystem');
const updateHandlerService = require('../generateCode/updateHandler');

describe('Update Handler', () => {
  it('should make function calls in the generated folder handler file', async (done) => {
    const mockComponentList = {
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
              payload: [Object],
              sequence: 2,
              refName: 'refN2',
              dependencies: [Array],
            },
          ],
        },
      ],
    };
    const writeFileSpy = jest.spyOn(fs, 'writeFile');
    const handlerDummyData = `./projectPath/Project1/src/handlers/R1.handler.js", "const services = require('../services/R1.service.js');·
    const R1getHandler = async (req, res) => {
      try {
        const { body, params } = req;
        const result = await services.R1getService();
        res.status(200).json({ message: result });
      } catch (error) {
        res.status(500).json({ message: error });
      }
    };·
    module.exports = { R1getHandler };
    `;
    writeFileSpy.mockResolvedValue('Success');
    await updateHandlerService.updateHandler('generatedFolder', ['R1'], mockComponentList, './projectPath/Project1');
    expect(writeFileSpy).toHaveBeenCalledWith('./projectPath/Project1/src/handlers/R1.handler.js', handlerDummyData);
    done();
  });
});
