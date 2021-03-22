const {
  checkRefNameExist,
  checkRouteIdExist,
  checkRouteSequenceExists,
  findDependenciesNotExist,
  checkConfigIdExist,
  checkSequenceBeforeUpdate,
} = require('../config.service.helper');
const { Configuration, Route } = require('../../../models');

describe('checkRouteIdExist function ', () => {
  afterEach(() => { jest.clearAllMocks(); });
  const spyOnFindOne = jest.spyOn(Route, 'findOne');
  it('should return false if routeId is not present', async () => {
    spyOnFindOne.mockResolvedValue(null);
    const receivedValue = await checkRouteIdExist(1);
    expect(receivedValue).toBe(false);
  });
  it('should return true if routeId is present', async () => {
    spyOnFindOne.mockResolvedValue('Present');
    const receivedValue = await checkRouteIdExist(1);
    expect(receivedValue).toBe(true);
  });
});

describe('checkRouteSequenceExists function ', () => {
  afterEach(() => { jest.clearAllMocks(); });
  const spyOnFindOne = jest.spyOn(Configuration, 'findOne');
  it('should return false if sequence for particular route is not present', async () => {
    spyOnFindOne.mockResolvedValue(null);
    const receivedValue = await checkRouteSequenceExists(1);
    expect(receivedValue).toBe(false);
  });
  it('should return true if sequence for particular route is present', async () => {
    spyOnFindOne.mockResolvedValue('Present');
    const receivedValue = await checkRouteSequenceExists(1);
    expect(receivedValue).toBe(true);
  });
});
describe('findDependenciesNotExist function ', () => {
  afterEach(() => { jest.clearAllMocks(); });
  const spyOnFindAll = jest.spyOn(Configuration, 'findAll');
  it('should return undefined if component does not have any dependencies', async () => {
    const MOCK_DEPENDENCIES = undefined; // no dependencies for that component
    const receivedValue = await findDependenciesNotExist(MOCK_DEPENDENCIES);
    expect(receivedValue).toBe(undefined);
  });
  it('should return undefined if all the dependencies provided for a component exist', async () => {
    const MOCK_DEPENDENCIES = [1, 2];
    spyOnFindAll.mockResolvedValue(['Present', 'Present']);
    const receivedValue = await findDependenciesNotExist(MOCK_DEPENDENCIES);
    expect(receivedValue).toBe(undefined);
  });
  it('should return array of dependencies that do not exist', async () => {
    const MOCK_DEPENDENCIES = [1, 2, 3]; // suppose only dependency  1  exist
    spyOnFindAll
      .mockResolvedValue([{ dataValues: { id: 1 } }]); // findAll returns only one dependency
    const receivedValue = await findDependenciesNotExist(MOCK_DEPENDENCIES);
    expect(receivedValue).toEqual([2, 3]); // should tell which dependency does not exist which is 2
  });
});
describe('checkConfigIdExist function ', () => {
  afterEach(() => { jest.clearAllMocks(); });
  const spyOnFindOne = jest.spyOn(Configuration, 'findOne');
  it('should return false if configId is not present', async () => {
    spyOnFindOne.mockResolvedValue(null);
    const receivedValue = await checkConfigIdExist(1);
    expect(receivedValue).toBe(false);
  });
  it('should return true if routeId is present', async () => {
    spyOnFindOne.mockResolvedValue('Present');
    const receivedValue = await checkConfigIdExist(1);
    expect(receivedValue).toBe(true);
  });
});
describe('checkSequenceBeforeUpdate function ', () => {
  afterEach(() => { jest.clearAllMocks(); });
  const spyOnFindOne = jest.spyOn(Configuration, 'findOne');
  it('should return false if sequence for route of given configId is not present', async () => {
    spyOnFindOne.mockResolvedValueOnce({ dataValues: 'Present' }); // every configId will be associated to one routeId
    spyOnFindOne.mockResolvedValueOnce(null);
    const receivedValue = await checkSequenceBeforeUpdate(1, 1);
    expect(receivedValue).toBe(false);
  });
  it('should return true if sequence for route of given configId is present', async () => {
    spyOnFindOne.mockResolvedValueOnce({ dataValues: 'Present' });
    spyOnFindOne.mockResolvedValue('Present');
    const receivedValue = await checkSequenceBeforeUpdate(1, 1);
    expect(receivedValue).toBe(true);
  });
});

describe('checkRefNameExist function', () => {
  afterEach(() => { jest.clearAllMocks(); });
  const spyOnFindOne = jest.spyOn(Configuration, 'findOne');
  it('should return true if refName for provided routeId exists', async () => {
    spyOnFindOne.mockResolvedValue({ dataValues: 'Present' });
    const receivedValue = await checkRefNameExist(undefined, 1, 'MOCK_REF_NAME');
    expect(receivedValue).toBe(true);
  });
  it('should return true if refName for provided configId"s route already exists', async () => {
    spyOnFindOne.mockResolvedValueOnce({ dataValues: 'Present' });
    spyOnFindOne.mockResolvedValue('Present');
    const receivedValue = await checkRefNameExist(1, undefined, 'MOCK_REF_NAME');
    expect(receivedValue).toBe(true);
  });
  it('should return false if refName does not exist', async () => {
    spyOnFindOne.mockResolvedValueOnce({ dataValues: 'Present' });
    spyOnFindOne.mockResolvedValue(null);
    const receivedValue = await checkRefNameExist(1, undefined, 'MOCK_REF_NAME');
    expect(receivedValue).toBe(false);
  });
});
