/* eslint-disable camelcase */
const {
  Custom_Component, Configuration, Route, Project,
} = require('../../models');
const fileUtils = require('../utils/file.util');

const checkTypeAlreadyExist = async (type) => {
  const typeFound = await Custom_Component.findOne({
    where: {
      type,
    },
  });
  if (typeFound) {
    return true;
  }
  return false;
};
  // check if a custom component with the given config id is already present
const checkCustomCompAlreadyExist = async (configId) => {
  const customCompFound = await Custom_Component.findOne({
    where: {
      configId,
    },
  });
  if (customCompFound) {
    return true;
  }
  return false;
};
  // to get refNames of corresponding dependency
const signatureHelper = async (configId) => {
  const dependency = await Configuration.findOne({
    where: {
      id: configId,
    },
  });
  if (dependency.dataValues.dependencies) {
    const refNames = await dependency.dataValues.dependencies.map(async (dependencyNo) => {
      const refName = await Configuration.findOne({
        where: {
          id: dependencyNo,
        },
      });
      return refName.dataValues.refName;
    });
    const refNamesSignature = await Promise.all(refNames);
    return refNamesSignature;
  }
  return null;
};
  // to get projectID
const projectIdHelper = async (configId) => {
  const configData = await Configuration.findOne({
    where: {
      id: configId,
    },
  });
  const { routeId } = configData.dataValues;
  const routeData = await Route.findOne({
    where: {
      id: routeId,
    },
  });
  const projectId = routeData.dataValues.p_id;
  return [projectId];
};
  // to get implementation code
const implementationHelper = async (configId) => {
  const configData = await Configuration.findOne({
    where: {
      id: configId,
    },
  });
  const { refName } = configData.dataValues;
  const { routeId } = configData.dataValues;
  const routeData = await Route.findOne({
    where: {
      id: routeId,
    },
  });
  const projectId = routeData.dataValues.p_id;
  const projectData = await Project.findOne({
    where: {
      id: projectId,
    },
  });
  const projectName = projectData.dataValues.name;
  try {
    const implementationCode = await fileUtils.readFile(`./${projectName}/src/services/${refName}.service.js`);
    return implementationCode;
  } catch {
    return null;
  }
  // if implementation code file does not exist
  // implementation column of custom componennt table will have null value
};
module.exports = {
  checkTypeAlreadyExist,
  checkCustomCompAlreadyExist,
  signatureHelper,
  implementationHelper,
  projectIdHelper,
};
