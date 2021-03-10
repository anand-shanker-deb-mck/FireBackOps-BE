const lodash = require('lodash');
const fs = require('../../utils/fileSystem');

const updateHandler = async (projectName, routesNameList, componentList) => {
  const { routes } = componentList;

  // routeNameList to identify what all routes are to be seperated
  // Each route will make a different route file
  routesNameList.forEach((routeName) => {
    let moduleExportList = '';

    // Filter the routes according to the routeName.
    const filteredRoutes = routes.filter((route) => route.routeName === routeName);

    let handlerData = 'const utils = require("../utils/index.js");\n';

    // Each item in the filtered route will make a new handler function
    filteredRoutes.forEach((route) => {
      moduleExportList += `${route.routeName}${route.method.toLowerCase()}Handler, `;

      // Start of handler function
      handlerData += `const ${route.routeName}${route.method.toLowerCase()}Handler = (req,res) => {\n`;

      // Sort all the configurations within route by sequenceNumber
      const sortedConfiguration = lodash.sortBy(route.configuration, (o) => o.sequenceNumber);

      // Add function calls for each sorted configuration
      sortedConfiguration.forEach((config) => {
        if (config.type === 'API') {
          handlerData += `const ${config.refName} = utils.make${lodash.capitalize(config.type)}Call('${config.payload.endpoint}', '${config.payload.method.toLowerCase()}');\n`;
        }
        if (config.type === 'MAPPER') {
          handlerData += `const ${config.refName} = utils.make${lodash.capitalize(config.type)}Call([${config.dependencies}], '${config.payload.code}');\n`;
        }
      });
      // Add statemennt to send the last refName of sortedList as response
      handlerData += `res.status(200).send(${sortedConfiguration.pop().refName})};\n`;
    });

    // Add statement to export modules(functions) from the handler file
    handlerData += `module.exports = {${moduleExportList}};`;
    fs.writeFile(`${projectName}/src/handlers/${routeName}.handler.js`, handlerData);
  });
};

module.exports = { updateHandler };
