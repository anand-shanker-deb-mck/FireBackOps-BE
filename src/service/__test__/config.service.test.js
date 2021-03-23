const configServiceHelpers = require('../config.service.helper');
const { storeConfig, updateConfig } = require('../config.service');
const { Configuration } = require('../../../models');

describe('storeConfig function', () => {
  afterEach(() => { jest.clearAllMocks(); });
  const spyOnCheckRouteSeq = jest.spyOn(configServiceHelpers, 'checkRouteSequenceExists');
  const spyOnCheckRoute = jest.spyOn(configServiceHelpers, 'checkRouteIdExist');
  const spyOnCheckDependencies = jest.spyOn(configServiceHelpers, 'findDependenciesNotExist');
  const spyOnCreate = jest.spyOn(Configuration, 'create');
  const spyOnCheckRefName = jest.spyOn(configServiceHelpers, 'checkRefNameExist');
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
  it('should throw InvalidBodyError if refName already exists', async () => {
    spyOnCheckRoute.mockResolvedValue(true); // routeId exists already
    spyOnCheckRouteSeq.mockResolvedValue(false); // sequence for a routeId does not exist
    spyOnCheckDependencies.mockResolvedValue(undefined); // all dependencies exist
    spyOnCheckRefName.mockResolvedValue(true); // refName already exists
    try {
      await storeConfig(MOCK_BODY);
    } catch (error) {
      expect(error.message).toBe('The reference name for route already exists');
    }
  });
  it('should enter config to db and return data on successful insertion', async () => {
    spyOnCheckRoute.mockResolvedValue(true); // routeId exists already
    spyOnCheckRouteSeq.mockResolvedValue(false); // sequence for a routeId does not exist
    spyOnCheckDependencies.mockResolvedValue(undefined); // all dependencies exist
    spyOnCheckRefName.mockResolvedValue(false);
    spyOnCreate.mockResolvedValue({
      dataValues: {
        id: 1, componentType: 'MOCK TYPE', routeId: 1, sequence: 1, dependencies: [1, 2], refName: 'MOCK REF NAME', payload: 'MOCK PAYLOAD',
      },
    });
    const receivedValue = await storeConfig(MOCK_BODY);
    const MOCK_EXPECTED_VALUE = {
      id: 1,
      type: 'MOCK TYPE',
      routeId: 1,
      sequence: 1,
      dependencies: [1, 2],
      refName: 'MOCK REF NAME',
      payload: 'MOCK PAYLOAD',
    };
    expect(receivedValue).toEqual(MOCK_EXPECTED_VALUE);
  });
});
describe('updateConfig function', () => {
  afterEach(() => { jest.clearAllMocks(); });
  const spyOnCheckRouteSeq = jest.spyOn(configServiceHelpers, 'checkRouteSequenceExists');
  const spyOnCheckRoute = jest.spyOn(configServiceHelpers, 'checkRouteIdExist');
  const spyOnCheckDependencies = jest.spyOn(configServiceHelpers, 'findDependenciesNotExist');
  const spyOnCheckConfig = jest.spyOn(configServiceHelpers, 'checkConfigIdExist');
  const spyOnCheckSeq = jest.spyOn(configServiceHelpers, 'checkSequenceBeforeUpdate');
  const spyOnUpdate = jest.spyOn(Configuration, 'update');
  const spyOnCheckRefName = jest.spyOn(configServiceHelpers, 'checkRefNameExist');
  it('should throw InvalidBodyError if the provided configId does not exist', async () => {
    const MOCK_BODY = { id: 1 };
    spyOnCheckConfig.mockResolvedValue(false); // routeId does not exist
    try {
      await updateConfig(MOCK_BODY);
    } catch (error) {
      expect(error.message).toBe('The specified configId does not exist');
    }
  });
  it('should throw InvalidBodyError if the provided routeId does not exist', async () => {
    const MOCK_BODY = { id: 1, routeId: 2 };
    spyOnCheckConfig.mockResolvedValue(true); // configId exists
    spyOnCheckRoute.mockResolvedValue(false); // routeId does not exist
    try {
      await updateConfig(MOCK_BODY);
    } catch (error) {
      expect(error.message).toBe('The specified routeId does not exist');
    }
  });
  it('should throw InvalidBodyError if the provided combo of sequence and routeId to update already exist', async () => {
    const MOCK_BODY = { id: 1, routeId: 2, sequence: 1 };
    spyOnCheckConfig.mockResolvedValue(true); // configId exists
    spyOnCheckRoute.mockResolvedValue(true); // routeId exists already
    spyOnCheckRouteSeq.mockResolvedValue(true); // sequence and routeId combo exist
    try {
      await updateConfig(MOCK_BODY);
    } catch (error) {
      expect(error.message).toBe('Two configurations cannot have same sequence in a route');
    }
  });
  it('should throw InvalidBodyError if the provided combo of refName and routeId to update already exist', async () => {
    const MOCK_BODY = { id: 1, routeId: 2, refName: 'MOCK_REF_NAME' };
    spyOnCheckConfig.mockResolvedValue(true); // configId exists
    spyOnCheckRoute.mockResolvedValue(true); // routeId exists already
    spyOnCheckRefName.mockResolvedValue(true); // refName and routeId combo exist
    try {
      await updateConfig(MOCK_BODY);
    } catch (error) {
      expect(error.message).toBe('The reference name for route already exists');
    }
  });
  it('should throw InvalidBodyError if the provided refName to update already exist for that configs route', async () => {
    const MOCK_BODY = { id: 1, refName: 'MOCK_REF_NAME' };
    // user want to update the refName of component with configId 1 to MOCK_REF_NAME,
    // but refName MOCK_REF_NAME in the route which configId is part of, already exists
    spyOnCheckConfig.mockResolvedValue(true); // configId exists
    spyOnCheckRefName.mockResolvedValue(true); // refName exists
    try {
      await updateConfig(MOCK_BODY);
    } catch (error) {
      expect(error.message).toBe('The reference name for route already exists');
    }
  });
  it('should throw InvalidBodyError if the provided sequence to update already exist for that configs route', async () => {
    const MOCK_BODY = { id: 1, sequence: 1 };
    // user want to update the sequence of component with configId 1 to 1,
    // but sequence 1 in the route which configId is part of, already exists
    spyOnCheckConfig.mockResolvedValue(true); // configId exists
    spyOnCheckSeq.mockResolvedValue(true); // sequence exists
    try {
      await updateConfig(MOCK_BODY);
    } catch (error) {
      expect(error.message).toBe('The sequence already exists for that route');
    }
  });
  it('should throw InvalidBodyError if any of the provided dependencies do not exist', async () => {
    const MOCK_BODY = { id: 1, dependencies: [1, 2, 3] };
    const MOCK_DEPENDENCY_NOT_EXIST = [1, 2];
    spyOnCheckDependencies
      .mockResolvedValue(MOCK_DEPENDENCY_NOT_EXIST); // dependencies 1,2 do not exist
    try {
      await updateConfig(MOCK_BODY);
    } catch (error) {
      expect(error.message).toBe(`Dependencies [${MOCK_DEPENDENCY_NOT_EXIST}] do not exist`);
    }
  });
  it('should throw InvalidBodyError if user tries to update type without valid payload ', async () => {
    const MOCK_BODY = { id: 1, type: 'MOCK TYPE' };
    spyOnCheckConfig.mockResolvedValue(true);
    try {
      await updateConfig(MOCK_BODY);
    } catch (error) {
      expect(error.message).toBe('Cannot update type without valid payload and vice versa');
    }
  });
  it('should update config data in db and return data on successful updation: dependencies', async () => {
    const MOCK_BODY = {
      id: 1,
      routeId: 1,
      type: 'MOCK CHANGED TYPE',
      sequence: 2,
      dependencies: [1, 2],
      refName: 'MOCK CHANGED REF NAME',
      payload: 'MOCK CHANGED PAYLOAD',
    };
    spyOnCheckConfig.mockResolvedValue(true); // configId exists
    spyOnCheckDependencies.mockResolvedValue(undefined); // all dependencies exist
    spyOnCheckSeq.mockResolvedValue(false); // seq does not already exist
    spyOnCheckRouteSeq.mockResolvedValue(false);
    spyOnCheckRefName.mockResolvedValue(false);
    spyOnUpdate.mockResolvedValue([1, [{
      dataValues: {
        id: 1,
        componentType: 'MOCK CHANGED TYPE',
        routeId: 1,
        sequence: 1,
        dependencies: [1, 2],
        refName: 'MOCK CHANGED REF NAME',
        payload: 'MOCK CHANGED PAYLOAD',
      },
    }],
    ]);
    const receivedValue = await updateConfig(MOCK_BODY);
    const MOCK_EXPECTED_VALUE = {
      id: 1,
      type: 'MOCK CHANGED TYPE',
      routeId: 1,
      sequence: 1,
      dependencies: [1, 2],
      refName: 'MOCK CHANGED REF NAME',
      payload: 'MOCK CHANGED PAYLOAD',
    };
    expect(receivedValue).toEqual(MOCK_EXPECTED_VALUE);
  });
  it('should update config data in db and return data on successful updation: no dependencies', async () => {
    const MOCK_BODY = { // the user does not want to update the dependencies
      id: 1,
      routeId: 1,
      type: 'MOCK CHANGED TYPE',
      sequence: 2,
      refName: 'MOCK CHANGED REF NAME',
      payload: 'MOCK CHANGED PAYLOAD',
    };
    spyOnCheckConfig.mockResolvedValue(true); // configId exists
    spyOnCheckDependencies.mockResolvedValue(undefined); // all dependencies exist
    spyOnCheckSeq.mockResolvedValue(false); // seq does not already exist
    spyOnCheckRouteSeq.mockResolvedValue(false);
    spyOnUpdate.mockResolvedValue([1, [{
      dataValues: {
        id: 1,
        componentType: 'MOCK CHANGED TYPE',
        routeId: 1,
        sequence: 1,
        dependencies: [1, 2],
        refName: 'MOCK CHANGED REF NAME',
        payload: 'MOCK CHANGED PAYLOAD',
      },
    }],
    ]);
    const receivedValue = await updateConfig(MOCK_BODY);
    const MOCK_EXPECTED_VALUE = {
      id: 1,
      type: 'MOCK CHANGED TYPE',
      routeId: 1,
      sequence: 1,
      dependencies: [1, 2],
      refName: 'MOCK CHANGED REF NAME',
      payload: 'MOCK CHANGED PAYLOAD',
    };
    expect(receivedValue).toEqual(MOCK_EXPECTED_VALUE);
  });
});
