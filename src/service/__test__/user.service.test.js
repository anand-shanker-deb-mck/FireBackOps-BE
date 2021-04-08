const {
  getAllUsers, getUserById, createUser, getUserDetails,
} = require('../user.service');

const { User } = require('../../../models');

describe('getUserDetails function', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  it('should return all username and displayname', async () => {
    const spyOnFindAll = jest.spyOn(User, 'findAll');
    const MOCK_EXPECTED_VALUE = [
      {
        id: 1,
        user_name: 'hi',
        display_name: 'hi',
      },
      {
        id: 2,
        user_name: 'bye',
        display_name: 'bye',
      },
    ];
    spyOnFindAll.mockResolvedValue(MOCK_EXPECTED_VALUE);
    const recievedData = await getUserDetails();
    expect(recievedData).toEqual(MOCK_EXPECTED_VALUE);
  });
});

describe('getAllUsers function', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  it('should return all Users data', async () => {
    const spyOnFindAll = jest.spyOn(User, 'findAll');
    const MOCK_EXPECTED_VALUE = [
      {
        id: 15,
        user_id: 'abc',
        display_name: 'abc',
        updatedAt: '2021-03-06T10:11:48.313Z',
        createdAt: '2021-03-06T10:11:48.313Z',
      },
      {
        id: 15,
        user_id: 'xyz',
        display_name: 'xyz',
        updatedAt: '2021-03-06T10:11:48.313Z',
        createdAt: '2021-03-06T10:11:48.313Z',
      },
    ];
    spyOnFindAll.mockResolvedValue(MOCK_EXPECTED_VALUE);
    const recievedData = await getAllUsers();
    expect(recievedData).toEqual(MOCK_EXPECTED_VALUE);
  });
});

describe('getUserById function', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  const spyOnFindAll = jest.spyOn(User, 'findAll');
  it('should return User data for given user_id', async () => {
    const MOCK_EXPECTED_VALUE = [
      {
        id: 15,
        user_id: 'abc',
        display_name: 'abc',
        updatedAt: '2021-03-06T10:11:48.313Z',
        createdAt: '2021-03-06T10:11:48.313Z',
      },

    ];
    spyOnFindAll.mockResolvedValue(MOCK_EXPECTED_VALUE);
    const recievedData = await getUserById();
    expect(recievedData).toEqual(MOCK_EXPECTED_VALUE);
  });
});

describe('createUser function', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  it('should create a new user ', async () => {
    const spyOnCreate = jest.spyOn(User, 'create');
    const MOCK_INPUT_VALUE = [
      {

        user_id: 'a',
        display_name: 'abc',
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

    const createdData = await createUser(MOCK_INPUT_VALUE);
    expect(createdData).toEqual(MOCK_EXPECTED_VALUE.dataValues);
  });
});
