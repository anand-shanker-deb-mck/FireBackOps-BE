/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const {
  Project, Route, Route_Configuration, Config, Route_Configuration_Dependency,
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
      model: Config,
      attributes: ['type', 'payload'],
      include: [{
        model: Route_Configuration,
      }],
    }],
    where: {
      p_id: projectId,
    },
    attributes: ['name'],
  });

  return routeIds;
  // const routeIds = await Route.findAll({
  //   where: {
  //     p_id: projectId,
  //   },
  //   attributes: ['id'],
  // });
  // const newRouteIds = routeIds.map((routeId) => routeId.id);
  // let routeDetails = newRouteIds.map(async (routeId) => {
  //   const routeName = await Route.findOne({
  //     where: {
  //       id: routeId,
  //     },
  //     attributes: ['name'],
  //   });
  //   const configIdArray = await Route_Configuration.findAll({
  //     where: {
  //       RouteId: routeId,
  //     },
  //     attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('config_id')), 'config_id']],
  //     distinct: true,
  //   });
  //   const newConfigIdArray = configIdArray.map((id) => id.dataValues.config_id);
  //   let ConfigDetails = newConfigIdArray.map(async (configId) => {
  //     const type = await Config.findOne({
  //       where: {
  //         id: configId,
  //       },
  //       attributes: ['type'],
  //     });
  //     const payload = await Config.findOne({
  //       where: {
  //         id: configId,
  //       },
  //       attributes: ['payload'],
  //     });
  //     const refName = await Route_Configuration.findOne({
  //       where: {
  //         ConfigId: configId,
  //         RouteId: routeId,
  //       },
  //       attributes: ['refName'],
  //     });
  //     const sequence = await Route_Configuration.findOne({
  //       where: {
  //         ConfigId: configId,
  //         RouteId: routeId,
  //       },
  //       attributes: ['sequence'],
  //     });
  //     // console.log(sequence);
  //     const routeConfigId = await Route_Configuration.findOne({
  //       where: {
  //         ConfigId: configId,
  //         RouteId: routeId,
  //       },
  //       attributes: ['id'],
  //     });
  //     const dependenciesId = await Route_Configuration_Dependency.findAll({
  //       where: {
  //         RouteConfigurationRouteId: routeConfigId.id,
  //       },
  //       attributes: ['ConfigId'],
  //     });
  //     let dependencies = dependenciesId.map(async (depId) => {
  //       const depStrings = await Route_Configuration.findOne({
  //         where: {
  //           ConfigId: depId.ConfigId,
  //         },
  //         attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('refName')), 'refName']],
  //       });

  //       return depStrings.refName;
  //     });
  //     dependencies = await Promise.all(dependencies);
  //     return {
  //       type, sequence, payload, refName, dependencies,
  //     };
  //   });
  //   ConfigDetails = await Promise.all(ConfigDetails);
  //   return { routeName, ConfigDetails };
  // });
  // routeDetails = await Promise.all(routeDetails);
  // return routeDetails;
};

module.exports = { getRouteDetailsService, getProjectName };
