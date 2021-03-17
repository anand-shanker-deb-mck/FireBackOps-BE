const {
  uniq,
  find,
} = require('lodash');
const {
  Configuration,
} = require('../../models');

const filterDetails = async (projectDetails) => {
  const { routes } = projectDetails;

  const rawDependencyIds = routes.reduce((dependencyIdList, route) => {
    const configurationDependencies = route.configurations.reduce((
      configDependencyCollection, configuration,
    ) => {
      if (configuration.dependencies) {
        return [
          ...configDependencyCollection,
          ...configuration.dependencies,
        ];
      }
      return configDependencyCollection;
    }, []);
    return [
      ...dependencyIdList,
      ...configurationDependencies,
    ];
  }, []);

  // Remove the duplicate ids
  const dependencyIds = uniq(rawDependencyIds);

  // Fetch all depency names in oneshot DB call
  const dependencyNames = await Configuration.findAll({
    where: {
      id: dependencyIds,
    },
    attributes: ['id', 'refName'],
  });

  // Add dependency names to the  configuration payload
  const newRoute = routes.map((route) => {
    const newConfig = route.configurations.map((configuration) => {
      if (configuration.dependencies) {
        const newDependencies = configuration.dependencies.map((
          dependency,
        ) => {
          const {
            refName,
          } = find(dependencyNames, {
            id: dependency,
          });
          return refName;
        });
        return {
          ...configuration,
          dependencies: newDependencies,
        };
      }
      return configuration;
    });
    return {
      ...route,
      configurations: newConfig,
    };
  });

  const newProjectDetails = {
    ...projectDetails,
    routes: newRoute,
  };
  return newProjectDetails;
};

module.exports = {
  filterDetails,
};
