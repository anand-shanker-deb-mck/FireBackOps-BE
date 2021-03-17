const projectUsersHandler = require('../projectUsers.handler');
const projectUsersService = require('../../service/projectUsers.service');

describe('Poject usershandler', () => {
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
    mockValue = [
      {
        User: {
          userName: 'abc',
        },
      },
      {
        User: {
          userName: 'def',
        },
      },
    ];
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should set status code to 200 and return user details', async () => {
    const spyGetUserDetailsService = jest.spyOn(projectUsersService, 'getUserNamesService').mockResolvedValue(mockValue);
    await projectUsersHandler.getUserNames(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.status().json).toHaveBeenCalledWith({ data: mockValue });
    expect(spyGetUserDetailsService).toHaveBeenCalledWith(1);
  });
});

describe('Project users handler', () => {
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
    jest.spyOn(projectUsersService, 'getUserNamesService').mockRejectedValue(new Error('Project not found'));
    await projectUsersHandler.getUserNames(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.status().json).toHaveBeenCalledWith({ message: 'Project not found' });
  });
  it('should set status code to 500', async () => {
    jest.spyOn(projectUsersService, 'getUserNamesService').mockRejectedValue({ name: 'p1' });
    jest.spyOn(projectUsersService, 'getUserNamesService').mockRejectedValue(new Error());
    await projectUsersHandler.getUserNames(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.status().json).toHaveBeenCalledWith({ message: 'Internal server error' });
  });
});
