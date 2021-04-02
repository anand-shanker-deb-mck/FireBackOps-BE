const routeService = require('../route.service');
const { Route } = require('../../../models');

describe('addNewRouteService', () => {
  it('should add a new route', async () => {
    const mockRoute = {
      id: 26,
      name: 'get',
      r_config: {
        idk: 'akjdfcsdn',
      },
      p_id: 67,
      method: 'get',
      updatedAt: '2021-03-06T18:47:46.006Z',
      createdAt: '2021-03-06T18:47:46.006Z',
    };
    const mockBody = {
      name: 'get',
      r_config: {
        idk: 'akjdfcsdn',
      },
      p_id: 76,
    };
    jest.spyOn(Route, 'create').mockResolvedValue(mockRoute);
    const newRoute = await routeService.addNewRouteService(mockBody);
    expect(newRoute).toEqual(mockRoute);
  });
});

describe('getAllRoutesByProjectIDService', () => {
  it('should get all routes for some project id', async () => {
    const mockRoute = [
      {
        id: 26,
        name: 'get',
        r_config: {
          idk: 'akjdfcsdn',
        },
        p_id: 67,
        updatedAt: '2021-03-06T18:47:46.006Z',
        createdAt: '2021-03-06T18:47:46.006Z',
      },
    ];
    jest.spyOn(Route, 'findAll').mockResolvedValue(mockRoute);
    const newRoute = await routeService.getAllRoutesByProjectIDService();
    expect(newRoute).toEqual(mockRoute);
  });
});

describe('Update route by routeId', () => {
  let mockBody;
  beforeAll(() => {
    mockBody = {
      name: 'get',
      r_config: {
        idk: 'akjdfcsdn',
      },
      p_id: 76,
    };
  });
  it('should update route', async () => {
    const mockRoute = {
      stored: {
        id: 26,
        name: 'get',
        r_config: {
          idk: 'akjdfcsdn',
        },
        p_id: 67,
        updatedAt: '2021-03-06T18:47:46.006Z',
        createdAt: '2021-03-06T18:47:46.006Z',
      },
    };

    jest.spyOn(Route, 'update').mockResolvedValueOnce(1);
    jest.spyOn(Route, 'findOne').mockResolvedValue(mockRoute);
    const updatedRoute = await routeService.updateRouteService(1, mockBody);
    expect(updatedRoute).toEqual(mockRoute);
  });
  it('should not update route', async () => {
    jest.spyOn(Route, 'update').mockResolvedValueOnce(0);
    const failUpdate = await routeService.updateRouteService(1, mockBody);
    expect(failUpdate).toEqual('Not a valid id');
  });
});

describe('getRouteDetails function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const MOCK_ROUTE_DETAILS = {
    id: 26,
    name: 'get',
    r_config: {
      idk: 'akjdfcsdn',
    },
    p_id: 67,
    updatedAt: '2021-03-06T18:47:46.006Z',
    createdAt: '2021-03-06T18:47:46.006Z',
  };
  it('should return route details', async () => {
    jest.spyOn(Route, 'findOne').mockResolvedValue(MOCK_ROUTE_DETAILS);
    const receivedValue = await routeService.getRouteDetails(26);
    expect(receivedValue).toEqual(MOCK_ROUTE_DETAILS);
  });
  it('should throw error if routeId  not found', async () => {
    jest.spyOn(Route, 'findOne').mockResolvedValue(null);
    try {
      await routeService.getRouteDetails(26);
    } catch (error) {
      expect(error.message).toBe('Route not found');
    }
  });
});
