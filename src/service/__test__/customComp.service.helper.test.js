/* eslint-disable camelcase */
const {
  checkCustomCompAlreadyExist,
  checkTypeAlreadyExist,
  signatureHelper,
  projectIdHelper,
  implementationHelper,
} = require('../customComp.service.helper');
const {
  Custom_Component, Configuration, Route, Project,
} = require('../../../models');
const fileUtils = require('../../utils/file.util');

describe('checkTypeAlreadyExist function', () => {
  afterEach(() => { jest.clearAllMocks(); });
  const spyOnFindOne = jest.spyOn(Custom_Component, 'findOne');
  it('should return false if type is not already present', async () => {
    spyOnFindOne.mockResolvedValue(null);
    const receivedValue = await checkTypeAlreadyExist('my_custom_component');
    expect(receivedValue).toBe(false);
  });
  it('should return true if type is already present', async () => {
    spyOnFindOne.mockResolvedValue('Present');
    const receivedValue = await checkTypeAlreadyExist('my_custom_component');
    expect(receivedValue).toBe(true);
  });
});
describe('checkCustomCompAlreadyExist function', () => {
  afterEach(() => { jest.clearAllMocks(); });
  const spyOnFindOne = jest.spyOn(Custom_Component, 'findOne');
  it('should return false if component with configId is not already present', async () => {
    spyOnFindOne.mockResolvedValue(null);
    const receivedValue = await checkCustomCompAlreadyExist(1);
    expect(receivedValue).toBe(false);
  });
  it('should return true if type is already present', async () => {
    spyOnFindOne.mockResolvedValue('Present');
    const receivedValue = await checkCustomCompAlreadyExist(1);
    expect(receivedValue).toBe(true);
  });
});
describe('signatureHelper function', () => {
  afterEach(() => { jest.clearAllMocks(); });
  const spyOnFindOne = jest.spyOn(Configuration, 'findOne');
  it('should return null if there are no dependencies for given configId', async () => {
    const MOCK_DEPENDENCIES = null;
    spyOnFindOne.mockResolvedValueOnce({ dataValues: { dependencies: MOCK_DEPENDENCIES } });
    const receivedValue = await signatureHelper(3);
    expect(receivedValue).toBe(null);
  });
  it('should return signatures array if there are dependencies for given configId', async () => {
    const MOCK_DEPENDENCIES = [1, 2];
    const MOCK_REFNAMES = ['source', 'destination'];
    spyOnFindOne.mockResolvedValueOnce({ dataValues: { dependencies: MOCK_DEPENDENCIES } });
    spyOnFindOne.mockResolvedValueOnce({ dataValues: { refName: MOCK_REFNAMES[0] } });
    spyOnFindOne.mockResolvedValueOnce({ dataValues: { refName: MOCK_REFNAMES[1] } });
    const receivedValue = await signatureHelper(3);
    expect(receivedValue).toStrictEqual(MOCK_REFNAMES);
  });
});
describe('projectIdHelper function', () => {
  afterEach(() => { jest.clearAllMocks(); });
  const spyOnConfigFindOne = jest.spyOn(Configuration, 'findOne');
  const spyOnRouteFindOne = jest.spyOn(Route, 'findOne');
  it('should return projectId for given configId', async () => {
    const MOCK_ROUTEID = 1;
    const MOCK_PROJECTID = 1;
    spyOnConfigFindOne.mockResolvedValue({ dataValues: { routeId: MOCK_ROUTEID } });
    spyOnRouteFindOne.mockResolvedValue({ dataValues: { p_id: MOCK_PROJECTID } });
    const receivedValue = await projectIdHelper(3);
    expect(receivedValue).toStrictEqual([MOCK_PROJECTID]);
  });
});
describe('implementationHelper function', () => {
  afterEach(() => { jest.clearAllMocks(); });
  const spyOnConfigFindOne = jest.spyOn(Configuration, 'findOne');
  const spyOnRouteFindOne = jest.spyOn(Route, 'findOne');
  const spyOnProjectFindOne = jest.spyOn(Project, 'findOne');
  const spyOnUtils = jest.spyOn(fileUtils, 'readFile');
  const MOCK_ROUTEID = 1;
  const MOCK_REFNAME = 'mockRefName';
  const MOCK_PROJECTID = 1;
  const MOCK_PROJECTNAME = 'mockProjectName';
  it('should return null if implementation code for given config id does not exists', async () => {
    spyOnConfigFindOne.mockResolvedValue({
      dataValues: { routeId: MOCK_ROUTEID, refName: MOCK_REFNAME },
    });
    spyOnRouteFindOne.mockResolvedValue({ dataValues: { p_id: MOCK_PROJECTID } });
    spyOnProjectFindOne.mockResolvedValue({ dataValues: { name: MOCK_PROJECTNAME } });
    const receivedValue = await implementationHelper(3);
    spyOnUtils.mockResolvedValue(null);
    expect(spyOnUtils).toHaveBeenCalledWith(`./${MOCK_PROJECTNAME}/src/services/${MOCK_REFNAME}.service.js`);
    expect(receivedValue).toBe(null);
  });
});
