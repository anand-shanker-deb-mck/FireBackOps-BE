const lodash = require('lodash');
const fs = require('../../utils/fileSystem');

const updateHandler = async (projectName, routesNameList, componentList, projectPath) => {
  const { routes } = componentList;
  // routeNameList to identify what all routes are to be seperated
  // Each route will make a different route file
  routesNameList.forEach((routeName) => {
    let moduleExportList = '';

    // Filter the routes according to the routeName.// ask-not:change routeName to name only
    const filteredRoutes = routes.filter((route) => route.name === routeName);

    let handlerData = 'const utils = require("../utils/index.js");\n\n';
    // Each item in the filtered route will make a new handler function
    filteredRoutes.forEach((route) => {
      let keys = Object.keys(route.r_config);
      keys = keys.map((key) => key.toLowerCase());
      keys.sort();
      let destructReq = keys.reduce((acc, curVal) => `${acc}${curVal}, `, '');
      destructReq = destructReq.substring(0, destructReq.length - 2);
      const handleReqString = `\n    const { ${destructReq} } = req;`;
      moduleExportList += `${route.name}${route.method.toLowerCase()}Handler, `;
      // Start of handler function
      handlerData += `const ${route.name}${route.method.toLowerCase()}Handler = (req, res) => {
  try{ ${handleReqString}`;

      // Sort all the configurations within route by sequenceNumber
      const sortedConfiguration = lodash.sortBy(route.configurations, (o) => o.sequence);
      sortedConfiguration.forEach((config) => {
        if (config.componentType === 'API') {
          handlerData += `\n    const ${config.refName} = utils.make${lodash.capitalize(config.componentType)}Call('${config.payload.url}', '${config.payload.method.toLowerCase()}');\n`;
        }
        if (config.componentType === 'MAPPER') {
          handlerData += `\n    const ${config.refName} = utils.make${lodash.capitalize(config.componentType)}Call([${config.dependencies}], '${config.payload.code}');\n`;
        }
      });
      // Add statement to send the last refName of sortedList as response
      handlerData += `    res.status(200).json({ message: ${sortedConfiguration.pop().refName} });
  }catch(error){\n    res.status(500).json({ message: error });
  }\n};\n\n`;
    });

    // Add statement to export modules(functions) from the handler file
    handlerData += `module.exports = { ${moduleExportList.substring(0, moduleExportList.length - 2)} };`;
    fs.writeFile(`${projectPath}/src/handlers/${routeName}.handler.js`, handlerData);
  });
};

module.exports = { updateHandler };
