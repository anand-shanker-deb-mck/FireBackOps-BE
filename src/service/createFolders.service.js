const {
  Project, Route, Configuration,
} = require('../../models');

const getProjectName = async (projectId) => {
  const projectName = await Project.findOne({
    where: {
      id: projectId,
    },
    attributes: ['name'],
  });

  return projectName;
};

const getRouteDetailsService = async (projectId) => {
  const routeIds = await Route.findAll({

    include: [{
      model: Configuration,
      as: 'configurations',
      attributes: ['componentType', 'payload', 'sequence', 'refName'],
    }],

    where: {
      p_id: projectId,
    },
    attributes: ['name'],
  });

  return routeIds;
};

module.exports = { getRouteDetailsService, getProjectName };
