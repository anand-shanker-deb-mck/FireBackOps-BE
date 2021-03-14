const projectServices = require('../../service');
const projectHandler = require('../project.handler');

describe('createProjectHandler', () => {
  const mockRequest = {
    body: {
      name: 'project111',
      pAttributes: { time: 2 },
    },
  };
  const mockResponse = {
    status: jest.fn(() => mockResponse),
    send: jest.fn(),
  };
  const responseValue = {
    id: 7,
    name: 'project111',
    pAttributes: {
      time: 2,
    },
    updatedAt: '2021-03-11T13:40:23.463Z',
    createdAt: '2021-03-11T13:40:23.463Z',
  };
  it('should return status code 200 and create a project', async () => {
    jest.spyOn(projectServices, 'createProject').mockResolvedValueOnce(responseValue);
    await projectHandler.createProjectHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(responseValue);
    expect(projectServices.createProject).toHaveBeenCalledWith('project111', { time: 2 });
  });
  it('should set status code to 500 if error in accessing db', async () => {
    jest.spyOn(projectServices, 'createProject').mockRejectedValue(new Error('Error in creating'));
    await projectHandler.createProjectHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
  });
});

describe('updateProjectHandler', () => {
  const mockRequest = {
    body: {
      name: 'project15',
      pAttributes: { time: 2 },
    },
    params: {
      id: 1,
    },
  };
  const mockResponse = {
    status: jest.fn(() => mockResponse),
    send: jest.fn(),
  };
  it('should return status code 200 and update a project with object passed', async () => {
    jest.spyOn(projectServices, 'updateProject').mockResolvedValueOnce('1');
    await projectHandler.updateProjectHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith('1');
    expect(projectServices.updateProject).toHaveBeenCalledWith('project15', { time: 2 }, 1);
  });
  it('should set status code to 500 if error in accessing db', async () => {
    jest.spyOn(projectServices, 'updateProject').mockRejectedValue(new Error('Error in updating'));
    await projectHandler.updateProjectHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
  });
});

describe('getAllProjectsHandler', () => {
  const responseValue = [
    {
      id: 1,
      userName: 'bye',
      displayName: 'bye',
      createdAt: '2021-03-11T11:20:26.688Z',
      updatedAt: '2021-03-11T11:20:26.688Z',
      projects: [
        {
          id: 1,
          name: 'df',
          pAttributes: {
            time: 2,
          },
          createdAt: '2021-03-11T12:39:28.869Z',
          updatedAt: '2021-03-11T12:39:28.869Z',
          User_Project: {
            createdAt: '2021-03-11T12:39:42.647Z',
            updatedAt: '2021-03-11T12:39:42.647Z',
            ProjectId: 1,
            UserId: 1,
          },
        },
      ],
    },
  ];
  const mockRequest = {
    params: {
      id: 1,
    },
  };
  const mockResponse = {
    status: jest.fn(() => mockResponse),
    send: jest.fn(),
  };
  it('get projects from database for given user_id', async () => {
    jest.spyOn(projectServices, 'getAllProjects').mockResolvedValueOnce(responseValue);
    await projectHandler.getAllProjectsHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(responseValue);
    expect(projectServices.getAllProjects).toHaveBeenCalledWith(1);
  });
  it('should set status code to 500 if error in accessing db', async () => {
    jest.spyOn(projectServices, 'getAllProjects').mockRejectedValue(new Error('Error in accessing db'));
    await projectHandler.getAllProjectsHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
  });
});

describe('getProjectByIdHandler', () => {
  const responseValue = [
    {
      id: 1,
      userName: 'bye',
      displayName: 'bye',
      createdAt: '2021-03-11T11:20:26.688Z',
      updatedAt: '2021-03-11T11:20:26.688Z',
      projects: [
        {
          id: 1,
          name: 'df',
          pAttributes: {
            time: 2,
          },
          createdAt: '2021-03-11T12:39:28.869Z',
          updatedAt: '2021-03-11T12:39:28.869Z',
          User_Project: {
            createdAt: '2021-03-11T12:39:42.647Z',
            updatedAt: '2021-03-11T12:39:42.647Z',
            ProjectId: 1,
            UserId: 1,
          },
        },
      ],
    },
  ];
  const mockRequest = {
    params: {
      id: 1,
    },
  };
  const mockResponse = {
    status: jest.fn(() => mockResponse),
    send: jest.fn(),
  };
  it('get projects from database for given user_id', async () => {
    jest.spyOn(projectServices, 'getProjectById').mockResolvedValueOnce(responseValue);
    await projectHandler.getProjectByIdHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(responseValue);
    expect(projectServices.getProjectById).toHaveBeenCalledWith(1);
  });
  it('should set status code to 500 if error in accessing db', async () => {
    jest.spyOn(projectServices, 'getProjectById').mockRejectedValue(new Error('Error in accessing db'));
    await projectHandler.getProjectByIdHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
  });
});

describe('deleteProjectByIdHandler', () => {
  const mockRequest = {
    params: {
      id: 1,
    },
  };
  const mockResponse = {
    status: jest.fn(() => mockResponse),
    send: jest.fn(),
    sendStatus: jest.fn(() => mockResponse),
  };

  it('should set status code to 500 if error in accessing db', async () => {
    jest.spyOn(projectServices, 'deleteProjectById').mockRejectedValue(new Error('Error in accessing db'));
    await projectHandler.deleteProjectByIdHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
  });
});
describe('delete all projects', () => {
  const mockRequest = {
    params: {
      id: 1,
    },
  };
  const mockResponse = {
    sendStatus: jest.fn(() => mockResponse),
    send: jest.fn(),
    status: jest.fn(() => mockResponse),
  };
  it('should return sendStatus 200 and delete all the projects in database', async () => {
    jest.spyOn(projectServices, 'deleteAllProjects').mockResolvedValueOnce('xyz');
    await projectHandler.deleteProjectHandler(mockRequest, mockResponse);
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith('xyz');
    expect(projectServices.deleteAllProjects).toHaveBeenCalledWith();
  });
  it('should set status code to 500 if error in accessing db', async () => {
    jest.spyOn(projectServices, 'deleteAllProjects').mockRejectedValue(new Error('Error in deleting'));
    await projectHandler.deleteProjectHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
  });
});

describe('delete all projects', () => {
  const mockRequest = {
    params: {
      id: 1,
    },
  };
  const mockResponse = {
    sendStatus: jest.fn(() => mockResponse),
    send: jest.fn(),
    status: jest.fn(() => mockResponse),
  };
  it('should return sendStatus 200 and delete all the projects in database', async () => {
    jest.spyOn(projectServices, 'deleteAllProjects').mockResolvedValueOnce('xyz');
    await projectHandler.deleteProjectHandler(mockRequest, mockResponse);
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith('xyz');
    expect(projectServices.deleteAllProjects).toHaveBeenCalledWith();
  });
  it('should set status code to 500 if error in accessing db', async () => {
    jest.spyOn(projectServices, 'deleteAllProjects').mockRejectedValue(new Error('Error in deleting'));
    await projectHandler.deleteProjectHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
  });
});
