/* eslint-disable camelcase */
const {
  insertConfigData,
  insertRouteConfigData,
  insertRouteConfigDependencies,
  updateRouteConfigDependencies,
  updateConfigData,
  updateRouteConfigData,
  checkDependenciesExist,
  checkExistingRouteSequence,
  checkRouteExist,
} = require('../storeConfig.service.helper');
const {
  Config, Route_Configuration, Route_Configuration_Dependency, Route,
} = require('../../../models');

describe('insertConfigData function', () => {
  afterEach(() => { jest.clearAllMocks(); });
  const spyOnCreate = jest.spyOn(Config, 'create');
  const MOCK_ARGUMENT = {
    type: 'MOCK_TYPE',
    payload: 'MOCK_PAYLOAD',
  };
  it('should return a resolved db promise', async () => {
    spyOnCreate.mockReturnValue(Promise.resolve('CREATED'));
    const receivedValue = await insertConfigData(MOCK_ARGUMENT.type, MOCK_ARGUMENT.payload);
    expect(receivedValue).toEqual('CREATED');
    expect(spyOnCreate).toHaveBeenCalledWith(MOCK_ARGUMENT);
  });
});
describe('insertRouteConfigData function', () => {
  afterEach(() => { jest.clearAllMocks(); });
  const spyOnCreate = jest.spyOn(Route_Configuration, 'create');
  const MOCK_ARGUMENT = {
    RouteId: 1, ConfigId: 1, sequence: 1, refName: 'MOCK_NAME',
  };
  it('should return a resolved db promise', async () => {
    spyOnCreate.mockReturnValue(Promise.resolve('CREATED'));
    const receivedValue = await insertRouteConfigData(MOCK_ARGUMENT.RouteId,
      MOCK_ARGUMENT.ConfigId, MOCK_ARGUMENT.sequence, MOCK_ARGUMENT.refName);

    expect(receivedValue).toEqual('CREATED');
    expect(spyOnCreate).toHaveBeenCalledWith(MOCK_ARGUMENT);
  });
});
describe('insertRouteConfigDependencies function', () => {
  afterEach(() => { jest.clearAllMocks(); });
  const spyOnCreate = jest.spyOn(Route_Configuration_Dependency, 'create');
  it('should return a single resolved db promise when no dependencies', async () => {
    const MOCK_RC_ID = 1;
    const MOCK_DEPENDENCIES = undefined;
    spyOnCreate.mockReturnValue(Promise.resolve('CREATED'));
    const receivedValue = await insertRouteConfigDependencies(MOCK_DEPENDENCIES, MOCK_RC_ID);
    expect(receivedValue).toEqual('CREATED');
    expect(spyOnCreate)
      .toHaveBeenCalledWith({ ConfigId: null, RouteConfigurationRouteId: MOCK_RC_ID });
  });
  it('should return an array of resolved db promises when dependencies present', async () => {
    const MOCK_RC_ID = 1;
    const MOCK_DEPENDENCIES = [1, 2];
    spyOnCreate.mockReturnValue(Promise.resolve('CREATED'));
    const receivedValue = await insertRouteConfigDependencies(MOCK_DEPENDENCIES, MOCK_RC_ID);
    expect(receivedValue).toEqual(['CREATED', 'CREATED']);
    expect(spyOnCreate)
      .toHaveBeenNthCalledWith(1, { ConfigId: 1, RouteConfigurationRouteId: MOCK_RC_ID });
    expect(spyOnCreate)
      .toHaveBeenNthCalledWith(2, { ConfigId: 2, RouteConfigurationRouteId: MOCK_RC_ID });
  });
});
describe('updateConfigData function', () => {
  afterEach(() => { jest.clearAllMocks(); });
  const spyOnUpdate = jest.spyOn(Config, 'update');
  const MOCK_ARGUMENT_1 = {
    type: 'MOCK_TYPE',
    payload: 'MOCK_PAYLOAD',
  };
  const MOCK_ARGUMENT_2 = {
    where: {
      id: 1,
    },
  };
  const MOCK_ARGUMENT_3 = { returning: true };
  it('should return a resolved db promise', async () => {
    spyOnUpdate.mockReturnValue(Promise.resolve('UPDATED'));
    const receivedValue = await updateConfigData('MOCK_TYPE', 'MOCK_PAYLOAD', 1);
    expect(receivedValue).toEqual('UPDATED');
    expect(spyOnUpdate).toHaveBeenCalledWith(MOCK_ARGUMENT_1, MOCK_ARGUMENT_2, MOCK_ARGUMENT_3);
  });
});

describe('updateRouteConfigData function', () => {
  afterEach(() => { jest.clearAllMocks(); });
  const spyOnUpdate = jest.spyOn(Route_Configuration, 'update');
  const MOCK_ROUTE_ID = 1;
  const MOCK_CONFIG_ID = 1;
  const MOCK_SEQUENCE = 1;
  const MOCK_REF_NAME = 'MOCK REF';
  const MOCK_ARGUMENT_1 = {
    RouteId: MOCK_ROUTE_ID,
    ConfigId: MOCK_CONFIG_ID,
    sequence: MOCK_SEQUENCE,
    refName: MOCK_REF_NAME,
  };
  const MOCK_ARGUMENT_2 = {
    where: {
      id: 1,
    },
  };
  const MOCK_ARGUMENT_3 = { returning: true };
  it('should return a resolved db promise', async () => {
    spyOnUpdate.mockReturnValue(Promise.resolve('UPDATED'));
    const receivedValue = await updateRouteConfigData(
      MOCK_ROUTE_ID, MOCK_CONFIG_ID, MOCK_SEQUENCE, MOCK_REF_NAME, 1,
    );
    expect(receivedValue).toEqual('UPDATED');
    expect(spyOnUpdate).toHaveBeenCalledWith(MOCK_ARGUMENT_1, MOCK_ARGUMENT_2, MOCK_ARGUMENT_3);
  });
});

describe('checkRouteExist function ', () => {
  afterEach(() => { jest.clearAllMocks(); });
  const spyOnFindOne = jest.spyOn(Route, 'findOne');
  it('should return false if routeId is not present', async () => {
    spyOnFindOne.mockResolvedValue(null);
    const receivedValue = await checkRouteExist(1);
    expect(receivedValue).toBe(false);
  });
  it('should return true if routeId is present', async () => {
    spyOnFindOne.mockResolvedValue('Present');
    const receivedValue = await checkRouteExist(1);
    expect(receivedValue).toBe(true);
  });
});

describe('checkExistingRouteSequence function ', () => {
  afterEach(() => { jest.clearAllMocks(); });
  const spyOnFindOne = jest.spyOn(Route_Configuration, 'findOne');
  it('should return false if sequence for particular route is not present', async () => {
    spyOnFindOne.mockResolvedValue(null);
    const receivedValue = await checkExistingRouteSequence(1);
    expect(receivedValue).toBe(false);
  });
  it('should return true if sequence for particular route is present', async () => {
    spyOnFindOne.mockResolvedValue('Present');
    const receivedValue = await checkExistingRouteSequence(1);
    expect(receivedValue).toBe(true);
  });
});
describe('checkDependenciesExist function ', () => {
  afterEach(() => { jest.clearAllMocks(); });
  const spyOnFindAll = jest.spyOn(Config, 'findAll');
  it('should return "exist" if component does not have any dependencies', async () => {
    const MOCK_DEPENDENCIES = undefined; // no dependencies for that component
    const receivedValue = await checkDependenciesExist(MOCK_DEPENDENCIES);
    expect(receivedValue).toBe('exist');
  });
  it('should return "exist" if all the dependencies provided for a component exist', async () => {
    const MOCK_DEPENDENCIES = [1, 2];
    spyOnFindAll.mockResolvedValue(['Present', 'Present']);
    const receivedValue = await checkDependenciesExist(MOCK_DEPENDENCIES);
    expect(receivedValue).toBe('exist');
  });
  it('should return array of dependencies that do not exist', async () => {
    const MOCK_DEPENDENCIES = [1, 2, 3]; // suppose only dependency  1  exist
    spyOnFindAll
      .mockResolvedValue([{ dataValues: { id: 1 } }]); // findAll returns only one dependency
    const receivedValue = await checkDependenciesExist(MOCK_DEPENDENCIES);
    expect(receivedValue).toEqual([2, 3]); // should tell which dependency does not exist which is 2
  });
});
describe('updateRouteConfigDependencies', () => {
  afterEach(() => { jest.clearAllMocks(); });
  const spyOnUpdate = jest.spyOn(Route_Configuration_Dependency, 'update');
  it('should return an array of resolved db promises when dependencies present', async () => {
    const MOCK_RC_ID = 1;
    const MOCK_DEPENDENCIES = [1, 2];
    spyOnUpdate.mockReturnValue(Promise.resolve('UPDATED'));
    const receivedValue = await updateRouteConfigDependencies(MOCK_DEPENDENCIES,
      MOCK_RC_ID, [1, 2]);
    expect(receivedValue).toEqual(['UPDATED', 'UPDATED']);
    expect(spyOnUpdate)
      .toHaveBeenNthCalledWith(1,
        { ConfigId: 1, RouteConfigurationRouteId: MOCK_RC_ID },
        { where: { id: 1 } }, { returning: true });
    expect(spyOnUpdate)
      .toHaveBeenNthCalledWith(2,
        { ConfigId: 2, RouteConfigurationRouteId: MOCK_RC_ID },
        { where: { id: 2 } }, { returning: true });
  });
});
