/* eslint-disable camelcase */
const { Op } = require('sequelize');
const {
  Config, Route_Configuration, Route_Configuration_Dependency, Route,
} = require('../../models');

const insertRouteConfigDependencies = (dependencies, routeConfigId) => {
  if (dependencies === undefined) {
    return Route_Configuration_Dependency.create({
      ConfigId: null, RouteConfigurationRouteId: routeConfigId,
    });
  }
  const storeDependencyPromises = dependencies
    .map((dependency) => Route_Configuration_Dependency.create({
      ConfigId: dependency, RouteConfigurationRouteId: routeConfigId,
    }));
  return Promise.all(storeDependencyPromises);
};

const updateRouteConfigDependencies = (dependencies, routeConfigId, ids) => {
  const updateDependencyPromises = dependencies
    .map((dependency, index) => Route_Configuration_Dependency.update({
      ConfigId: dependency, RouteConfigurationRouteId: routeConfigId,
    }, {
      where: {
        id: ids[index],
      },
    }, { returning: true }));
  return Promise.all(updateDependencyPromises);
};

const insertConfigData = (type, payload) => Config.create({
  type, payload,
});

const updateConfigData = (type, payload, id) => Config.update({
  type, payload,
}, {
  where: {
    id,
  },
}, { returning: true });

const insertRouteConfigData = (routeId, configId, sequence, refName) => Route_Configuration.create({
  RouteId: routeId, ConfigId: configId, sequence, refName,
});

const updateRouteConfigData = (routeId, configId, sequence, refName, id) => Route_Configuration
  .update({
    RouteId: routeId, ConfigId: configId, sequence, refName,
  }, {
    where: {
      id,
    },
  }, { returning: true });

const checkRouteExist = async (routeId) => {
  const route = await Route.findOne({
    where: {
      id: routeId,
    },
  });
  if (route === null) {
    return false;
  }
  return true;
};

const checkExistingRouteSequence = async (routeId, sequence) => {
  const existingRouteSequence = await Route_Configuration.findOne({
    where: {
      sequence, RouteId: routeId,
    },
  });
  if (existingRouteSequence === null) {
    return false;
  }
  return true;
};

const checkDependenciesExist = async (dependencies) => {
  if (!dependencies) {
    return 'exist';
  }
  const existingDependencies = await Config.findAll({
    where: {
      id: {
        [Op.in]: dependencies,
      },
    },
  });
  if (existingDependencies.length === dependencies.length) {
    return 'exist';
  }
  const dependenciesNotExisting = dependencies.filter((dependency) => {
    const array = existingDependencies
      .find((existingDependency) => existingDependency.dataValues.id === dependency);
    if (array) {
      return false;
    }
    return true;
  });
  return dependenciesNotExisting;
};

module.exports = {
  insertConfigData,
  insertRouteConfigData,
  insertRouteConfigDependencies,
  updateConfigData,
  updateRouteConfigData,
  updateRouteConfigDependencies,
  checkDependenciesExist,
  checkExistingRouteSequence,
  checkRouteExist,
};
