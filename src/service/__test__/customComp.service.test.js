/* eslint-disable camelcase */
const customCompServiceHelpers = require('../customComp.service.helper');
const { storeCustomComp } = require('../customComp.service');
const { Custom_Component } = require('../../../models');

describe('storeCustomComp function', () => {
  afterEach(() => { jest.clearAllMocks(); });
  const spyOnCheckTypeAlreadyExist = jest.spyOn(customCompServiceHelpers, 'checkTypeAlreadyExist');
  const spyOnCheckCustomCompExist = jest.spyOn(customCompServiceHelpers, 'checkCustomCompAlreadyExist');
  const spyOnSignatureHelper = jest.spyOn(customCompServiceHelpers, 'signatureHelper');
  const spyOnProjectIdHelper = jest.spyOn(customCompServiceHelpers, 'projectIdHelper');
  const spyOnImplementationHelper = jest.spyOn(customCompServiceHelpers, 'implementationHelper');
  const spyOnCreate = jest.spyOn(Custom_Component, 'create');
  const MOCK_BODY = {
    configId: 1,
    type: 'MOCK TYPE',
    signature: ['MOCK SIGNATURE', 'MOCK SIGATURE'],
    implementation: 'MOCK IMPLEMENTATION',
    projectID: [1],
  };
  it('should throw InvalidBodyError if custom component with given configId already exists', async () => {
    spyOnCheckCustomCompExist.mockResolvedValue(true);
    try {
      await storeCustomComp(MOCK_BODY);
    } catch (error) {
      expect(error.message).toBe('Custom component with given configId already exists');
    }
  });
  it('should throw InvalidBodyError if component with given type already exists', async () => {
    spyOnCheckTypeAlreadyExist.mockResolvedValue(true);
    try {
      await storeCustomComp(MOCK_BODY);
    } catch (error) {
      expect(error.message).toBe('Component with given type already exists');
    }
  });
  it('should enter information to db and return data on successful insertion', async () => {
    spyOnCheckTypeAlreadyExist.mockResolvedValue(false);
    spyOnCheckCustomCompExist.mockResolvedValue(false);
    spyOnSignatureHelper.mockResolvedValue(['MOCK SIGNATURE', 'MOCK SIGATURE']);
    spyOnProjectIdHelper.mockResolvedValue([1]);
    spyOnImplementationHelper.mockResolvedValue('MOCK IMPLEMENTATION');
    spyOnCreate.mockResolvedValue({
      dataValues: {
        id: 1,
        configId: 1,
        type: 'MOCK TYPE',
        signature: ['MOCK SIGNATURE', 'MOCK SIGATURE'],
        implementation: 'MOCK IMPLEMENTATION',
        projectID: [1],
      },
    });
    const receivedValue = await storeCustomComp(MOCK_BODY);
    const MOCK_EXPECTED_VALUE = {
      dataValues: {
        id: 1,
        configId: 1,
        type: 'MOCK TYPE',
        signature: ['MOCK SIGNATURE', 'MOCK SIGATURE'],
        implementation: 'MOCK IMPLEMENTATION',
        projectID: [1],
      },
    };
    expect(receivedValue).toEqual(MOCK_EXPECTED_VALUE);
  });
});
