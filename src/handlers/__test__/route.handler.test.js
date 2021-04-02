const routeService = require('../../service/route.service');
const routeHandler = require('../route.handler');

describe('addNewRouteHandler', () => {
  let mockRoute;
  let mockReq;
  let mockSend;
  let mockRes;
  beforeAll(() => {
    mockSend = jest.fn();
    mockRes = {
      status: jest.fn(() => ({ send: mockSend })),
    };
    mockRoute = {
      id: 36,
      name: 'route_1',
      r_config: {
        bcd: 'akjdfcsdn',
      },
      p_id: 1,
      method: 'get',
      updatedAt: '2021-03-07T15:41:18.192Z',
      createdAt: '2021-03-07T15:41:18.192Z',
    };
    mockReq = {
      body: {
        name: 'route_1',
        method: 'get',
        r_config: {
          bcd: 'akjdfcsdn',
        },
        p_id: 1,
      },
    };
  });
  it('should add a new route along status code 201', async () => {
    jest.spyOn(routeService, 'addNewRouteService')
      .mockResolvedValue(mockRoute);
    await routeHandler.addNewRouteHandler(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockSend).toHaveBeenCalledWith(mockRoute);
  });
  it('should go to catch block', async () => {
    const mockError = {
      message: 'Invalid Request',
    };
    jest.spyOn(routeService, 'addNewRouteService').mockRejectedValue(mockError);
    await routeHandler.addNewRouteHandler(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith();
  });
});

describe('getAllRoutesByProjectIDHandler', () => {
  let mockSend;
  let mockResponse;
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
    mockSend = jest.fn();
    mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };
  });
  it('should return all route along status code 200', async () => {
    const mockRequest = {
      params: { id: 1 },
    };
    jest.spyOn(routeService, 'getAllRoutesByProjectIDService')
      .mockResolvedValue(mockRoute);

    await routeHandler.getAllRoutesByProjectIDHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockSend).toHaveBeenCalledWith(mockRoute);
  });
  it('should go to catch block', async () => {
    const mockRequest = {
      params: { id: 1 },
    };
    const mockError = {
      message: 'Invalid Request',
    };
    jest.spyOn(routeService, 'getAllRoutesByProjectIDService').mockRejectedValue(mockError);

    await routeHandler.getAllRoutesByProjectIDHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith();
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

describe('getRouteDetailsHandler', () => {
  afterEach(() => { jest.clearAllMocks(); });
  const mockJson = jest.fn();
  const mockResponse = {
    status: jest.fn(() => ({ json: mockJson })),
  };
  const spyOnGetRouteDetails = jest.spyOn(routeService, 'getRouteDetails');
  it('should return route details and set status code to 200', async () => {
    spyOnGetRouteDetails.mockResolvedValue('MOCK DATA');
    await routeHandler.getRouteDetailsHandler({ params: 1 }, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith({ data: 'MOCK DATA' });
  });
  it('should set status code to 500 and send error message in case of internal error', async () => {
    spyOnGetRouteDetails.mockRejectedValue(new Error('Internal Error'));
    try {
      await routeHandler.getRouteDetailsHandler({ params: 1 }, mockResponse);
    } catch (error) {
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ message: 'Internal Error' });
    }
  });
  it('should set status code to 400 and send error message in case of routeId not found', async () => {
    spyOnGetRouteDetails.mockRejectedValue(new Error('Route not found'));
    try {
      await routeHandler.getRouteDetailsHandler({ params: 1 }, mockResponse);
    } catch (error) {
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({ message: 'Route not found' });
    }
  });
});
