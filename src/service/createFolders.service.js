const { Project, Route } = require('../../models');

const getProjectName = async (projectId) => {
  const projectName = await Project.findOne({
    where: {
      id: projectId,
    },
    attributes: ['name'],
  });

  return projectName;
};

const getRouteNamesService = async (projectId) => {
  const routeNames = await Route.findAll({
    where: {
      p_id: projectId,
    },
    attributes: ['name'],
  });

  return routeNames;
};

module.exports = { getRouteNamesService, getProjectName };
