const configServiceHelpers = require('./config.service.helper');
const InvalidBodyError = require('../errors/invalidBody.error');
const { Configuration } = require('../../models');

const storeConfig = async (body) => {
  const {
    type, payload, refName, routeId, dependencies, sequence,
  } = body;
  const doesRouteIdExist = await configServiceHelpers.checkRouteIdExist(routeId);
  if (!doesRouteIdExist) {
    throw new InvalidBodyError('The specified routeId does not exist');
  }
  const doesRouteSeqExist = await configServiceHelpers.checkRouteSequenceExists(routeId, sequence);
  if (doesRouteSeqExist) {
    throw new InvalidBodyError('Two configurations cannot have same sequence in a route');
  }
  const dependenciesNotExisting = await configServiceHelpers.findDependenciesNotExist(dependencies);
  if (dependenciesNotExisting) {
    throw new InvalidBodyError(`Dependencies [${dependenciesNotExisting}] do not exist`);
  }
  const configData = await Configuration.create({
    componentType: type, payload, refName, routeId, dependencies, sequence,
  });
  const storedConfigData = { ...configData.dataValues, type };
  delete storedConfigData.componentType;
  return storedConfigData;
};

const updateConfig = async (body) => {
  const {
    id, type, payload, refName, routeId, dependencies, sequence,
  } = body;
  const doesConfigIdExist = await configServiceHelpers.checkConfigIdExist(id);
  if (!doesConfigIdExist) {
    throw new InvalidBodyError('The specified configId does not exist');
  }
  if ((!type && payload) || (type && !payload)) {
    throw new InvalidBodyError('Cannot update type without valid payload and vice versa');
  }
  if (routeId) {
    const doesRouteIdExist = await configServiceHelpers.checkRouteIdExist(routeId);
    if (!doesRouteIdExist) {
      throw new InvalidBodyError('The specified routeId does not exist');
    }
  }
  if (routeId && sequence) {
    const doesRouteSeqExist = await configServiceHelpers
      .checkRouteSequenceExists(routeId, sequence);
    if (doesRouteSeqExist) {
      throw new InvalidBodyError('Two configurations cannot have same sequence in a route');
    }
  }
  if (sequence) {
    const doesSeqAlreadyExist = await configServiceHelpers.checkSequenceBeforeUpdate(id, sequence);
    if (doesSeqAlreadyExist) {
      throw new InvalidBodyError('The sequence already exists for that route');
    }
  }
  if (dependencies) {
    const dependenciesNotExisting = await configServiceHelpers
      .findDependenciesNotExist(dependencies);
    if (dependenciesNotExisting) {
      throw new InvalidBodyError(`Dependencies [${dependenciesNotExisting}] do not exist`);
    }
  }

  const configData = await Configuration.update({
    dependencies, sequence, payload, routeId, refName, componentType: type,
  }, { where: { id }, returning: true });
  const typeToReturn = configData[1][0].dataValues.componentType;
  const updatedConfigData = { ...configData[1][0].dataValues, type: typeToReturn };
  delete updatedConfigData.componentType;
  return updatedConfigData;
};
module.exports = {
  updateConfig,
  storeConfig,
};
