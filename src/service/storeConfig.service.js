const configServiceHelpers = require('./storeConfig.service.helper');
const InvalidBodyError = require('../errors/invalidBody.error');

const storeConfig = async (body) => {
  const {
    type, payload, refName, routeId, dependencies, sequence,
  } = body;
  if (!(await configServiceHelpers.checkRouteExist(routeId))) {
    throw new InvalidBodyError('The specified routeId does not exist');
  }
  if (await configServiceHelpers.checkExistingRouteSequence(routeId, sequence)) {
    throw new InvalidBodyError('Two configurations cannot have same sequence in a route');
  }
  const message = await configServiceHelpers.checkDependenciesExist(dependencies);
  if (message !== 'exist') {
    throw new InvalidBodyError(`Dependencies [${message}] do not exist`);
  }
  const SUCCESS_MESSAGE = 'Configuration stored successfully';
  // inserting the config data
  const configData = await configServiceHelpers.insertConfigData(type, payload);
  const configId = configData.dataValues.id;
  const routeConfigData = await configServiceHelpers
    .insertRouteConfigData(routeId, configId, sequence, refName);
  const routeConfigId = routeConfigData.dataValues.id;
  const dependenciesData = await configServiceHelpers
    .insertRouteConfigDependencies(dependencies, routeConfigId);
  let routeConfigDependencyId;
  if (dependencies) {
    routeConfigDependencyId = dependenciesData
      .reduce((acc, dependencyData) => acc.concat(dependencyData.dataValues.id), []);
  } else {
    routeConfigDependencyId = dependenciesData.dataValues.id;
  }
  return {
    message: SUCCESS_MESSAGE,
    configData: {
      config: {
        configId,
        type,
        payload,
      },
      routeConfig: {
        routeConfigId,
        routeId,
        configId,
        sequence,
        refName,
      },
      routeConfigDependency: {
        routeConfigDependencyId,
        routeConfigId,
        dependencies,
      },
    },
  };
};

module.exports = {
  storeConfig,
};
