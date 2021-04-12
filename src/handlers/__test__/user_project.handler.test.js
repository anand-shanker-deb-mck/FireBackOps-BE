const UserProjectHandler = require('../user_project.handler');
const userProjectServices = require('../../service');

describe('create a user project', () => {
  const mockRequest = {
    user: { id: 1 },
    body: {
      userAdded: { id: 4, userName: 'pushya' },
      ProjectId: 3,

    },
  };
  const mockResponse = {
    status: jest.fn(() => mockResponse),
    send: jest.fn(),
    json: jest.fn(),
  };
  const responseValue = {
    ProjectId: 3,
    UserId: 4,
    updatedAt: '2021-03-14T04:18:44.771Z',
    createdAt: '2021-03-14T04:18:44.771Z',
  };
  it('should return status code 200 and create a user project', async () => {
    jest.spyOn(userProjectServices, 'createUserProject').mockResolvedValue(responseValue);
    await UserProjectHandler.createUserProjectHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.send).toHaveBeenCalledWith(responseValue);
    expect(userProjectServices.createUserProject).toHaveBeenCalledWith(3, 4);
  });
  it('should set status code to 500 if error in accessing db', async () => {
    jest.spyOn(userProjectServices, 'createUserProject').mockRejectedValue(new Error('Error in creating'));
    await UserProjectHandler.createUserProjectHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
  });
});
