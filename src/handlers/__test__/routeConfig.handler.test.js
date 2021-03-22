const routeConfigHandler = require('../routeConfig.handler');
const routeConfigService = require('../../service/routeConfig.service');

describe('Route Config Handler', () => {
  let mockJson;
  let mockResponse;
  let mockRequest;
  let mockValue;
  beforeEach(() => {
    mockJson = jest.fn();
    mockResponse = {
      status: jest.fn(() => ({ json: mockJson })),
    };
    mockRequest = {
      params: { id: 1 },
    };
    mockValue = {
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
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should set status code to 200 and return route details', async () => {
    const spyGetRouteDetailsService = jest.spyOn(routeConfigService, 'getRouteConfig').mockResolvedValue(mockValue);
    await routeConfigHandler.routeConfigHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.status().json).toHaveBeenCalledWith({ data: mockValue });
    expect(spyGetRouteDetailsService).toHaveBeenCalledWith(1);
  });
});

describe('Route Config handler', () => {
  let mockJson;
  let mockResponse;
  let mockRequest;
  beforeEach(() => {
    mockJson = jest.fn();
    mockResponse = {
      status: jest.fn(() => ({ json: mockJson })),
    };
    mockRequest = {
      params: { id: 1 },
    };
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set status code to 400', async () => {
    jest.spyOn(routeConfigService, 'getRouteConfig').mockRejectedValue(new Error('Route not found'));
    await routeConfigHandler.routeConfigHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.status().json).toHaveBeenCalledWith({ message: 'Route not found' });
  });
  it('should set status code to 500', async () => {
    jest.spyOn(routeConfigService, 'getRouteConfig').mockRejectedValue({ name: 'r1' });
    jest.spyOn(routeConfigService, 'getRouteConfig').mockRejectedValue(new Error());
    await routeConfigHandler.routeConfigHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.status().json).toHaveBeenCalledWith({ message: 'Internal server error' });
  });
});
