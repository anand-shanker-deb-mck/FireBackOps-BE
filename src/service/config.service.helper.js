const { Op } = require('sequelize');
const { Configuration, Route } = require('../../models');

const checkRouteIdExist = async (routeId) => {
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
const findDependenciesNotExist = async (dependencies) => {
  if (!dependencies) {
    return undefined;
  }
  const existingDependencies = await Configuration.findAll({
    where: {
      id: {
        [Op.in]: dependencies,
      },
    },
  });
  if (existingDependencies.length === dependencies.length) {
    return undefined; // no dependency found that does not exist
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
const checkConfigIdExist = async (configId) => {
  const configData = await Configuration.findOne({
    where: {
      id: configId,
    },
  });
  if (configData === null) {
    return false;
  }
  return true;
};
const checkRefNameExist = async (configId, routeId, refName) => {
  let configData;
  if (!configId) {
    configData = await Configuration.findOne({
      where: {
        routeId,
        refName,
      },
    });
  } else {
    const routeIdData = await Configuration.findOne({
      where: {
        id: configId,
      },
      attributes: ['routeId'],
    });
    const { routeId: routeid } = routeIdData.dataValues;
    configData = await Configuration.findOne({
      where: {
        refName, routeId: routeid,
      },
    });
  }
  if (configData === null) {
    return false;
  }
  return true;
};
const checkSequenceBeforeUpdate = async (configId, sequence) => {
  const routeIdData = await Configuration.findOne({
    where: {
      id: configId,
    },
    attributes: ['routeId'],
  });
  const { routeId } = routeIdData.dataValues;
  const doesSeqExist = await Configuration.findOne({
    where: {
      sequence, routeId,
    },
  });
  if (doesSeqExist === null) {
    return false;
  }
  return true;
};

const checkRouteSequenceExists = async (routeId, sequence) => {
  const existingRouteSequence = await Configuration.findOne({
    where: {
      sequence, routeId,
    },
  });
  if (existingRouteSequence === null) {
    return false;
  }
  return true;
};

module.exports = {
  checkRouteIdExist,
  checkRouteSequenceExists,
  findDependenciesNotExist,
  checkSequenceBeforeUpdate,
  checkConfigIdExist,
  checkRefNameExist,
};
