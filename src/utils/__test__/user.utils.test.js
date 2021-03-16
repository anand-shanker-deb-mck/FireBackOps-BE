const { User } = require('../../../models');
const userUtils = require('../user.utils');

describe('createUser', () => {
  const mockUsername = 'abc';
  const mockUser = [{
    User: {
      dataValues: {
        id: 13,
        userName: 'abc',
        updatedAt: '2021-03-12T12:54:20.461Z',
        createdAt: '2021-03-12T12:54:20.461Z',
        displayName: null,
      },
      _previousDataValues: {
        userName: 'abc',
        id: 13,
        displayName: null,
        createdAt: '2021-03-12T12:54:20.461Z',
        updatedAt: '2021-03-12T12:54:20.461Z',
      },
      _options: {
        isNewRecord: true,
        _schema: null,
        _schemaDelimiter: '',
        attributes: undefined,
        include: undefined,
        raw: undefined,
        silent: undefined,
      },
      isNewRecord: false,
    },
  }];

  afterEach(() => jest.clearAllMocks());

  it('should return new or existing user object', async () => {
    jest.spyOn(User, 'findOrCreate').mockResolvedValue(mockUser);
    const result = await userUtils.createUser(mockUsername);
    expect(result).toStrictEqual(mockUser);
  });
});
