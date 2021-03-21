const { Route, Configuration } = require('../../models');

const getRouteConfig = (async (routeId) => {
  const routeDetails = await Route.findOne({
    where: {
      id: routeId,
    },
  });
  if (!routeDetails) { throw new Error('Route not found'); }
  const configDetails = await Route.findAll({
    include: [{
      model: Configuration,
      as: 'configurations',
      attributes: ['id', 'componentType', 'payload', 'dependencies', 'sequence', 'refName'],
    }],
    where: {
      id: routeId,
    },
    attributes: [],

  });
  return configDetails;
});

module.exports = {
  getRouteConfig,
};
