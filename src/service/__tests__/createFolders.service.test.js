const createFoldersService = require('../createFolders.service');
const { Project, Route } = require('../../../models');

describe('Get project name', () => {
  it('should return project name from the projecct id', async () => {
    jest.spyOn(Project, 'findOne').mockResolvedValue('name');
    const pName = await createFoldersService.getProjectName(1);
    expect(pName).toEqual('name');
  });
});

describe('Get route name service', () => {
  it('should return all route names from the projecct id', async () => {
    const routeList = ['R1', 'R2', 'R3'];
    jest.spyOn(Route, 'findAll').mockResolvedValue(routeList);
    const rNames = await createFoldersService.getRouteNamesService(1);
    expect(rNames).toEqual(routeList);
  });
});
