const routeService = require('../../service/route.service');
const routeHandler = require('../route.handler');

describe('Add a new route', () => {
  let mockRoute;
  let mockReq;
  beforeAll(() => {
    mockRoute = {
      id: 36,
      name: 'get',
      r_config: {
        bcd: 'akjdfcsdn',
      },
      p_id: 1,
      updatedAt: '2021-03-07T15:41:18.192Z',
      createdAt: '2021-03-07T15:41:18.192Z',
    };
    mockReq = {
      body: {
        name: 'get',
        r_config: {
          bcd: 'akjdfcsdn',
        },
        p_id: 1,
      },
    };
  });
  it('should add a new route along status code 201', async () => {
    const mockJson = jest
      .spyOn(routeService, 'addNewRouteService')
      .mockResolvedValue(mockRoute);
    const mockRes = {
      status: jest.fn(() => ({ json: mockJson })),
    };
    await routeHandler.addNewRouteHandler(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockJson).toHaveBeenCalledWith({ message: mockRoute });
  });
  it('should not add a new route along status code 400', async () => {
    const mockError = {
      message: 'Invalid Request',
    };
    jest.spyOn(routeService, 'addNewRouteService').mockRejectedValue(mockError);
    const mockJson = jest.fn();
    const mockRes = {
      status: jest.fn(() => ({ json: mockJson })),
    };
    await routeHandler.addNewRouteHandler(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.status().json).toHaveBeenCalledWith({
      error: mockError.message,
    });
  });
});

describe('Get all route', () => {
  let mockRoute;
  beforeAll(() => {
    mockRoute = {
      id: 13,
      name: 'get',
      r_config: {
        idk: 'idk',
      },
      p_id: 1,
      createdAt: '2021-03-05T17:22:17.114Z',
      updatedAt: '2021-03-05T19:57:19.063Z',
    };
  });
  it('should return all route along status code 200', async () => {
    const mockJson = jest
      .spyOn(routeService, 'getAllRoutesService')
      .mockResolvedValue(mockRoute);
    const mockRes = {
      status: jest.fn(() => ({ json: mockJson })),
    };
    await routeHandler.getAllRoutesHandler(null, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith(mockRoute);
  });
  it('should not return  route along status code 200', async () => {
    const mockError = {
      message: 'Invalid Request',
    };
    const mockJson = jest.fn();
    jest.spyOn(routeService, 'getAllRoutesService').mockRejectedValue(mockError);
    const mockRes = {
      status: jest.fn(() => ({ json: mockJson })),
    };
    await routeHandler.getAllRoutesHandler(null, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith(mockError);
  });
});

describe('Update route by routeId', () => {
  let mockRoute;
  let mockReq;
  beforeAll(() => {
    mockRoute = {
      id: 13,
      name: 'get',
      r_config: {
        bcd: 'avx',
      },
      p_id: 1,
      createdAt: '2021-03-05T17:22:17.114Z',
      updatedAt: '2021-03-07T16:44:33.708Z',
    };
    mockReq = {
      params: {
        id: 13,
      },
    };
  });
  it('should updated route along status code 201', async () => {
    const mockJson = jest
      .spyOn(routeService, 'updateRouteService')
      .mockResolvedValue(mockRoute);
    const mockRes = {
      status: jest.fn(() => ({ json: mockJson })),
    };
    await routeHandler.updateRouteHandler(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith({ updatedRoute: mockRoute });
  });
  it('should not updated route along status code 404', async () => {
    const mockError = {
      message: 'Invalid Request',
    };
    const mockJson = jest.fn();
    const mockRes = {
      status: jest.fn(() => ({ json: mockJson })),
    };
    jest.spyOn(routeService, 'updateRouteService').mockRejectedValue(mockError);
    await routeHandler.updateRouteHandler(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.status().json).toHaveBeenCalledWith({
      message: mockError.message,
    });
  });
});
