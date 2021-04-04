const lodash = require('lodash');
const fs = require('../../utils/fileSystem');

const updateHandler = async (projectName, routesNameList, componentList, projectPath) => {
  const { routes } = componentList;
  console.log('update handler', routes);
  console.log('configuration', routes[0].configurations);
  // routeNameList to identify what all routes are to be seperated
  // Each route will make a different route file
  routesNameList.forEach((routeName) => {
    // ask-not: we don't need to pass a different parameter specifically for that
    let moduleExportList = '';

    // Filter the routes according to the routeName.// ask-not:change routeName to name only
    const filteredRoutes = routes.filter((route) => route.name === routeName);

    let handlerData = 'const utils = require("../utils/index.js");\n';

    // Each item in the filtered route will make a new handler function
    filteredRoutes.forEach((route) => {
      moduleExportList += `${route.name}${route.method.toLowerCase()}Handler, `;

      // Start of handler function
      handlerData += `const ${route.name}${route.method.toLowerCase()}Handler = (req,res) => {\n`;

      // Sort all the configurations within route by sequenceNumber
      const sortedConfiguration = lodash.sortBy(route.configurations, (o) => o.sequence);

      // Add function calls for each sorted configuration
      sortedConfiguration.forEach((config) => {
        if (config.componentType === 'API') {
          handlerData += `const ${config.refName} = utils.make${lodash.capitalize(config.componentType)}Call('${config.payload.url}', '${config.payload.method.toLowerCase()}');\n`;
        }
        if (config.componentType === 'MAPPER') {
          handlerData += `const ${config.refName} = utils.make${lodash.capitalize(config.componentType)}Call([${config.dependencies}], '${config.payload.code}');\n`;
        }
      });
      // Add statemennt to send the last refName of sortedList as response
      handlerData += `res.status(200).send(${sortedConfiguration.pop().refName})};\n`;
    });

    // Add statement to export modules(functions) from the handler file
    handlerData += `module.exports = {${moduleExportList}};`;
    fs.writeFile(`${projectPath}/src/handlers/${routeName}.handler.js`, handlerData);
  });
};

module.exports = { updateHandler };
