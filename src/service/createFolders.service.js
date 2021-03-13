/* eslint-disable import/no-self-import */
const {
  Project, Route, Configuration,
} = require('../../models');

const filterDetails = async (projectDetails) => {
  const { routes } = projectDetails;
  let newRoute = routes.map(async (route) => {
    let newConfig = route.configurations.map(async (configuration) => {
      if (configuration.dependencies) {
        let newDep = configuration.dependencies.map(async (dependency) => {
          const dependencyString = await Configuration.findOne({
            where: {
              id: dependency,
            },
            attributes: ['refName'],
          });
          return dependencyString.refName;
        });
        newDep = await Promise.all(newDep);
        const newObj = { ...configuration, dependencies: newDep };
        return newObj;
      }
      return { ...configuration };
    });

    newConfig = await Promise.all(newConfig);
    return { ...route, configurations: newConfig };
  });
  newRoute = await Promise.all(newRoute);
  const newProjectDetails = { ...projectDetails, routes: newRoute };

  return newProjectDetails;
};

const getRouteDetailsService = async (projectId) => {
  const projectDetails = await Project.findOne({
    include: [{
      model: Route,
      as: 'routes',
      attributes: [['name', 'routeName']],

      include: [{
        model: Configuration,
        as: 'configurations',
        attributes: ['componentType', 'payload', 'sequence', 'refName', 'dependencies'],

      }],
    }],
    where: {
      id: projectId,
    },

    attributes: [['name', 'projectName']],
  });
  const newProjectDetails = JSON.parse(JSON.stringify(projectDetails));
  // console.log(newProject.routes[0].configurations);

  const filteredDetails = await filterDetails(newProjectDetails);

  return filteredDetails;
};

module.exports = { getRouteDetailsService, filterDetails };
