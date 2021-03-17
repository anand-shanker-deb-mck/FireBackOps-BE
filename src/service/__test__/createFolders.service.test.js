const createFoldersService = require('../createFolders.service');
const createFoldersHelper = require('../createFolder.service.helper');
const { Project } = require('../../../models');

describe('Get route details service', () => {
  test('should return all route details from the projecct id', async () => {
    const mockValue1 = {
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
              dependencies: [1, 2, 4],
            }],
        }],
    };
    const mockValue2 = {
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
              dependencies: ['a', 'b', 'c'],
            }],
        }],
    };

    const spyModel = jest.spyOn(Project, 'findOne').mockResolvedValue(mockValue1);
    jest.spyOn(createFoldersHelper, 'filterDetails').mockResolvedValue(mockValue2);
    const rNames = await createFoldersService.getRouteDetailsService(7);
    expect(spyModel).toHaveBeenCalled();
    expect(rNames).toEqual(mockValue2);
  });
});
