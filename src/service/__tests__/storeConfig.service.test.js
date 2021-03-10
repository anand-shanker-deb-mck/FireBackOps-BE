const configServiceHelpers = require('../storeConfig.service.helper');
const { storeConfig } = require('../storeConfig.service');

describe('storeConfig function', () => {
  afterEach(() => { jest.clearAllMocks(); });
  const spyOnCheckRouteSeq = jest.spyOn(configServiceHelpers, 'checkExistingRouteSequence');
  const spyOnCheckRoute = jest.spyOn(configServiceHelpers, 'checkRouteExist');
  const spyOnCheckDependencies = jest.spyOn(configServiceHelpers, 'checkDependenciesExist');
  const spyOnInsertConfig = jest.spyOn(configServiceHelpers, 'insertConfigData');
  const spyOnInsertRouteConfig = jest.spyOn(configServiceHelpers, 'insertRouteConfigData');
  const spyOnInsertDependencies = jest.spyOn(configServiceHelpers, 'insertRouteConfigDependencies');
  const MOCK_BODY = {
    type: 'MOCK TYPE',
    payload: 'MOCK PAYLOAD',
    refName: 'MOCK REF NAME',
    routeId: 1,
    dependencies: [1, 2],
    sequence: 1,
  };
  it('should throw InvalidBodyError if the provided routeId does not exist', async () => {
    spyOnCheckRoute.mockResolvedValue(false); // routeId does not exist
    try {
      await storeConfig(MOCK_BODY);
    } catch (error) {
      expect(error.message).toBe('The specified routeId does not exist');
    }
  });
  it('should throw InvalidBodyError if the provided sequence for a routeId already exist', async () => {
    spyOnCheckRoute.mockResolvedValue(true); // routeId exists already
    spyOnCheckRouteSeq.mockResolvedValue(true); // sequence for a routeId exist
    try {
      await storeConfig(MOCK_BODY);
    } catch (error) {
      expect(error.message).toBe('Two configurations cannot have same sequence in a route');
    }
  });
  it('should throw InvalidBodyError if any of the provided dependencies do not exist', async () => {
    spyOnCheckRoute.mockResolvedValue(true); // routeId exists already
    spyOnCheckRouteSeq.mockResolvedValue(false); // sequence for a routeId does not exist
    const MOCK_DEPENDENCY_NOT_EXIST = [1, 2];
    spyOnCheckDependencies
      .mockResolvedValue(MOCK_DEPENDENCY_NOT_EXIST); // dependencies 1,2 do not exist
    try {
      await storeConfig(MOCK_BODY);
    } catch (error) {
      expect(error.message).toBe(`Dependencies [${MOCK_DEPENDENCY_NOT_EXIST}] do not exist`);
    }
  });
  it('should enter config to db and return data on successful insertion: dependencies', async () => {
    spyOnCheckRoute.mockResolvedValue(true); // routeId exists already
    spyOnCheckRouteSeq.mockResolvedValue(false); // sequence for a routeId does not exist
    spyOnCheckDependencies.mockResolvedValue('exist'); // all dependencies exist
    spyOnInsertConfig.mockResolvedValue({ dataValues: { id: 1 } });
    spyOnInsertRouteConfig.mockResolvedValue({ dataValues: { id: 1 } });
    spyOnInsertDependencies
      .mockResolvedValue([{ dataValues: { id: 1 } }, { dataValues: { id: 2 } }]);
    const receivedValue = await storeConfig(MOCK_BODY);
    const MOCK_EXPECTED_VALUE = {
      message: 'Configuration stored successfully',
      configData: {
        config: {
          configId: 1, // returned by insertConfigData
          type: MOCK_BODY.type,
          payload: MOCK_BODY.payload,
        },
        routeConfig: {
          routeConfigId: 1, // returned by insertRouteConfigData
          routeId: 1,
          configId: 1, // the foreign key referencing configId
          sequence: MOCK_BODY.sequence,
          refName: MOCK_BODY.refName,
        },
        routeConfigDependency: {
          routeConfigDependencyId: [1, 2], // returned by insertRouteConfigDependencies
          routeConfigId: 1,
          dependencies: [1, 2],
        },
      },
    };
    expect(receivedValue).toEqual(MOCK_EXPECTED_VALUE);
  });
  it('should enter config to db and return data on successful insertion: no dependencies', async () => {
    spyOnCheckRoute.mockResolvedValue(true); // routeId exists already
    spyOnCheckRouteSeq.mockResolvedValue(false); // sequence for a routeId does not exist
    spyOnCheckDependencies.mockResolvedValue('exist'); // no  dependencies also return exist so that null can be inserted in db
    spyOnInsertConfig.mockResolvedValue({ dataValues: { id: 1 } });
    spyOnInsertRouteConfig.mockResolvedValue({ dataValues: { id: 1 } });
    spyOnInsertDependencies
      .mockResolvedValue({ dataValues: { id: 1 } });
    const MOCK_BODY_NO_DEPENDENCY = {
      type: 'MOCK TYPE',
      payload: 'MOCK PAYLOAD',
      refName: 'MOCK REF NAME',
      routeId: 1,
      sequence: 1,
    };
    const receivedValue = await storeConfig(MOCK_BODY_NO_DEPENDENCY);
    const MOCK_EXPECTED_VALUE = {
      message: 'Configuration stored successfully',
      configData: {
        config: {
          configId: 1, // returned by insertConfigData
          type: MOCK_BODY_NO_DEPENDENCY.type,
          payload: MOCK_BODY_NO_DEPENDENCY.payload,
        },
        routeConfig: {
          routeConfigId: 1, // returned by insertRouteConfigData
          routeId: 1,
          configId: 1, // the foreign key referencing configId
          sequence: MOCK_BODY_NO_DEPENDENCY.sequence,
          refName: MOCK_BODY_NO_DEPENDENCY.refName,
        },
        routeConfigDependency: {
          routeConfigDependencyId: 1, // returned by insertRouteConfigDependencies
          routeConfigId: 1,
          dependencies: undefined,
        },
      },
    };
    expect(receivedValue).toEqual(MOCK_EXPECTED_VALUE);
  });
});
