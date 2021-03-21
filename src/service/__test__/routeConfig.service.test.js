const routeConfigService = require('../routeConfig.service');
const { Route } = require('../../../models');

describe('get route details service', () => {
  it('should fetch details of all configurations for a routeId', async () => {
    const mockValue = {
      data: [
        {
          configurations: [
            {
              id: 1,
              componentType: 'Api',
              payload: {
                method: 'get',
              },
              dependencies: null,
              sequence: 1,
              refName: 'source',
            },
          ],
        },
      ],
    };
    jest.spyOn(Route, 'findOne').mockResolvedValue({ id: 'C1' });
    const spyModel = jest.spyOn(Route, 'findAll').mockResolvedValue(mockValue);
    const routeDetails = await routeConfigService.getRouteConfig(1);
    expect(routeDetails).toEqual(mockValue);
    expect(spyModel).toHaveBeenCalled();
  });

  it('should throw error if routeId not found', async () => {
    const mockValue = jest.spyOn(Route, 'findOne').mockResolvedValue(null);
    jest.spyOn(Route, 'findAll').mockResolvedValue(mockValue);
    await expect(routeConfigService.getRouteConfig(1)).rejects.toThrow('Route not found');
  });
});
