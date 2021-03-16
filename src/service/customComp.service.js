const customCompServiceHelpers = require('./config.service.helper');
const InvalidBodyError = require('../errors/invalidBody.error');
// eslint-disable-next-line camelcase
const { Custom_Component } = require('../../models');

const storeCustomComp = async (body) => {
  const { configId, type } = body;
  const doesTypeAlreadyExist = await customCompServiceHelpers.checkTypeAlreadyExist(type);
  if (doesTypeAlreadyExist) {
    throw new InvalidBodyError('Component with given type already exists');
  }
  const doesCompAlreadyExist = await customCompServiceHelpers.checkCustomCompAlreadyExist(configId);
  if (doesCompAlreadyExist) {
    throw new InvalidBodyError('Custom component with given configId already exists');
  }
  const signature = await customCompServiceHelpers.signatureHelper(configId);
  const projectId = await customCompServiceHelpers.projectIdHelper(configId);
  const implementation = await customCompServiceHelpers.implementationHelper(configId);
  const customCompData = await Custom_Component.create({
    configId, type, signature, implementation, projectId,
  });
  return customCompData;
};
module.exports = {
  storeCustomComp,
};
