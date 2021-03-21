/* eslint-disable camelcase */
const { createUserProject } = require('../user_project.service');
const { User_Project } = require('../../../models');

describe('createUserProject function', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  it('should create a new user_project ', async () => {
    const spyOnFindAllUserProject = jest.spyOn(User_Project, 'findOne');
    const MOCK_EXPECTED_VALUE1 = false;
    spyOnFindAllUserProject.mockResolvedValueOnce(MOCK_EXPECTED_VALUE1);

    const spyOnCreate = jest.spyOn(User_Project, 'create');

    const MOCK_EXPECTED_VALUE = {
      dataValues: {
        ProjectId: 2,
        UserId: 3,
        updatedAt: '2021-03-13T08:25:15.913Z',
        createdAt: '2021-03-13T08:25:15.913Z',
      },
    };
    spyOnCreate.mockResolvedValueOnce(MOCK_EXPECTED_VALUE);

    const createdData = await createUserProject(2, 'hi');
    expect(createdData).toEqual({
      dataValues: {
        ProjectId: 2, UserId: 3, createdAt: '2021-03-13T08:25:15.913Z', updatedAt: '2021-03-13T08:25:15.913Z',
      },
    });
  });
});
