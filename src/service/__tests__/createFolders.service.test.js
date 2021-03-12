const createFoldersService = require('../createFolders.service');
const { Project } = require('../../../models');

xdescribe('Get route details service', () => {
  test('should return all route details from the projecct id', async () => {
    const mockValue = {
      projectName: 'P1',
      routes: [
        {
          routeName: 'R1',
          configurations: [
            {
              componentType: 'Api',
              payload: {
                method: 'get',
              },
              sequence: 1,
              refName: 'source',
              dependencies: null,
            }],
        }],
    };

    const spyModel = jest.spyOn(Project, 'findOne').mockResolvedValue(mockValue);
    const spyFolder = jest.spyOn(createFoldersService, 'filterDetails');
    const rNames = await createFoldersService.getRouteDetailsService(1);
    expect(rNames).toEqual(mockValue);
    expect(spyModel).toHaveBeenCalled();
    expect(spyFolder).toHaveBeenCalled();
  });
});
