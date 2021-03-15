const UserHandler = require('../user.handler');
const userServices = require('../../service');

describe('getAllUsersHandler', () => {
  jest.useFakeTimers();
  afterEach(() => {
    jest.clearAllMocks();
  });
  const responseValue = {
    id: 15,
    user_id: 'abc',
    display_name: 'abc',
    updatedAt: '2021-03-06T10:11:48.313Z',
    createdAt: '2021-03-06T10:11:48.313Z',

  };
  const mockRequest = {};

  const mockResponse = {
    status: jest.fn(() => mockResponse),
    send: jest.fn(),

  };
  it('should get all user data from database', async () => {
    jest.spyOn(userServices, 'getAllUsers').mockResolvedValue(responseValue);
    await UserHandler.getAllUsersHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(responseValue);
    expect(userServices.getAllUsers).toHaveBeenCalledWith();
  });
  it('should set status code to 500 if error in accessing db', async () => {
    jest.spyOn(userServices, 'getAllUsers').mockRejectedValue(new Error('Error in accessing data'));
    await UserHandler.getAllUsersHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
  });
});

describe('Get user by id handler', () => {
  const mockRequest = {

    params: {
      id: 'xyz',
    },
  };
  const mockResponse = {
    status: jest.fn(() => mockResponse),
    send: jest.fn(),
  };
  const mockExpectedUser = [{
    createdAt: '2021-03-03T16:59:35.066Z',
    display_name: 'srishti',
    id: 1,
    updatedAt: '2021-03-03T16:59:35.066Z',
    user_id: 'xyz',
  }];
  it('should return status code 200 with user object', async () => {
    jest.spyOn(userServices, 'getUserById').mockResolvedValue(mockExpectedUser);
    await UserHandler.getUsersByIdHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(mockExpectedUser);
    expect(userServices.getUserById).toHaveBeenCalledWith('xyz');
  });
  it('should set status code to 500 if error in accessing db', async () => {
    jest.spyOn(userServices, 'getUserById').mockRejectedValue(new Error('Error in accessing data'));
    await UserHandler.getUsersByIdHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
  });
});

describe('create a user', () => {
  const mockRequest = {
    body: {
      userName: 'name',
      displayName: 'name',
    },

  };
  const mockResponse = {
    status: jest.fn(() => mockResponse),
    send: jest.fn(),
  };
  const responseValue = {
    id: 4,
    userName: 'name',
    displayName: 'name',
    updatedAt: '2021-03-11T14:02:15.124Z',
    createdAt: '2021-03-11T14:02:15.124Z',
  };
  it('should return status code 200 and create a user', async () => {
    jest.spyOn(userServices, 'createUser').mockResolvedValue(responseValue);
    await UserHandler.createUserHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.send).toHaveBeenCalledWith(responseValue);
    expect(userServices.createUser).toHaveBeenCalledWith('name', 'name');
  });
  it('should set status code to 500 if error in accessing db', async () => {
    jest.spyOn(userServices, 'createUser').mockRejectedValue(new Error('Error in creating'));
    await UserHandler.createUserHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
  });
});
