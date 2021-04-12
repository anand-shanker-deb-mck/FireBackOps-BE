const lodash = require('lodash');
const fs = require('../../utils/fileSystem');
const { prettifyJsText } = require('../../utils/jsFormatter');

const updateService = async (projectName, routesNameList, componentList, projectPath) => {
  const { routes } = componentList;
  // routeNameList to identify what all routes are to be seperated
  // Each route will make a different route file
  routesNameList.forEach((routeName) => {
    // ask-not: we don't need to pass a different parameter specifically for that
    let moduleExportList = '';

    // Filter the routes according to the routeName.// ask-not:change routeName to name only
    const filteredRoutes = routes.filter((route) => route.name === routeName);
    let serviceData = '';
    let isApi = 0;
    filteredRoutes.forEach((route) => {
      route.configurations.forEach((config) => {
        if (config.componentType === 'MAPPER') {
          serviceData += `const { make${config.refName.charAt(0).toUpperCase() + config.refName.slice(1, config.refName.length)}Call } = require("./${config.refName}.service.js");\n`;
        } else isApi = 1;
      });
    });
    if (isApi) {
      serviceData += 'const utils = require("../utils/index.js");\n';
    }
    // Each item in the filtered route will make a new handler function
    filteredRoutes.forEach((route) => {
      moduleExportList += `${route.name}${route.method.toLowerCase()}Service, `;
      // Start of handler function
      serviceData += `\nconst ${route.name}${route.method.toLowerCase()}Service = async (req) => {\n`;

      // Sort all the configurations within route by sequenceNumber
      const sortedConfiguration = lodash.sortBy(route.configurations, (o) => o.sequence);
      // Add function calls for each sorted configuration
      sortedConfiguration.forEach((config) => {
        if (config.componentType === 'API') {
          serviceData += `const ${config.refName} = await utils.make${config.componentType}Call('${config.payload.url}', '${config.payload.method}');\n`;
        }
        if (config.componentType === 'MAPPER') {
          serviceData += `const ${config.refName} = make${config.refName.charAt(0).toUpperCase() + config.refName.slice(1, config.refName.length)}Call([${config.dependencies}]);\n`;
        }
      });

      // Add statement to send the last refName of sortedList as response
      serviceData += `return (${sortedConfiguration.pop().refName}); };\n`;
    });

    // Add statement to export modules(functions) from the handler file
    serviceData += `module.exports = {${moduleExportList}};`;
    serviceData = prettifyJsText(serviceData);
    fs.writeFile(`${projectPath}/src/services/${routeName}.service.js`, serviceData);
  });
};

module.exports = { updateService };
