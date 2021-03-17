/* eslint-disable camelcase */
const projectUsersService = require('../projectUsers.service');
const { User_Project, Project } = require('../../../models');

describe('get username service', () => {
  it('should getch userName of all users for a projectId', async () => {
    const mockValue = [
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
    jest.spyOn(Project, 'findOne').mockResolvedValue({ name: 'P1' });
    const spyModel = jest.spyOn(User_Project, 'findAll').mockResolvedValue(mockValue);
    const userDetails = await projectUsersService.getUserNamesService(1);
    expect(userDetails).toEqual(mockValue);
    expect(spyModel).toHaveBeenCalled();
  });
});
describe('get username service', () => {
  it('should throw error if projectId not found', async () => {
    const mockValue = [
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
    jest.spyOn(Project, 'findOne').mockResolvedValue(null);
    jest.spyOn(User_Project, 'findAll').mockResolvedValue(mockValue);
    await expect(projectUsersService.getUserNamesService(1)).rejects.toThrow('Project not found');
  });
});
