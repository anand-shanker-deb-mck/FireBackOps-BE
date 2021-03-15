const {
  createProject, updateProject, deleteAllProjects,
  deleteProjectById, getAllProjects, getProjectById,
} = require('../project.service');

const { Project, User } = require('../../../models');

describe('getAllProjects', () => {
  it('should get all projects for given userId database', async () => {
    const ResolvedValue = [
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
    jest.spyOn(User, 'findAll').mockResolvedValue(ResolvedValue);
    const projects = await getAllProjects();
    expect(projects).toBe(ResolvedValue);
  });
});

describe('getProjectById', () => {
  it('should get all projects for given projectId', async () => {
    const ResolvedValue = [
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
    jest.spyOn(Project, 'findAll').mockResolvedValue(ResolvedValue);
    const projects = await getProjectById();
    expect(projects).toBe(ResolvedValue);
  });
});

describe('createUser function', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  it('should create a new user ', async () => {
    const spyOnCreate = jest.spyOn(Project, 'create');
    const MOCK_INPUT_VALUE = [
      {

        name: 'abc',

        p_attributes: 'abc',
      },
    ];
    const MOCK_EXPECTED_VALUE = [{
      dataValues: {
        id: 15,
        user_id: 'abcd',
        display_name: 'abc',
        updatedAt: '2021-03-06T10:11:48.313Z',
        createdAt: '2021-03-06T10:11:48.313Z',
      },

    }];
    spyOnCreate.mockResolvedValueOnce(MOCK_EXPECTED_VALUE);

    const createdData = await createProject(MOCK_INPUT_VALUE);
    expect(createdData).toEqual(MOCK_EXPECTED_VALUE.dataValues);
  });
});

describe('updateProject function', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  it('should create a new user ', async () => {
    const spyOnCreate = jest.spyOn(Project, 'update');
    const MOCK_EXPECTED_VALUE = {

      id: 'abc',

    };

    spyOnCreate.mockResolvedValueOnce(MOCK_EXPECTED_VALUE);

    const createdData = await updateProject('abc', 'abc');
    expect(createdData).toEqual(MOCK_EXPECTED_VALUE);
  });
});
describe('deleteProjectById', () => {
  const mockResolved = { id: 1 };
  it('should delete all projects in database', async () => {
    jest.spyOn(Project, 'destroy').mockResolvedValue(mockResolved);
    const response = await deleteProjectById(1);
    expect(response).toBe(mockResolved);
  });
});

describe('deleteAllProjects', () => {
  const mockResolved = { id: 1 };
  it('should a project in database', async () => {
    jest.spyOn(Project, 'destroy').mockResolvedValue(mockResolved);
    const response = await deleteAllProjects();
    expect(response).toBe(mockResolved);
  });
});
