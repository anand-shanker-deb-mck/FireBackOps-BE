const fs = require('../../utils/fileSystem');

const updateHandler = async (projectName, routesNameList, componentList, projectPath) => {
  const { routes } = componentList;
  // routeNameList to identify what all routes are to be seperated
  // Each route will make a different route file
  routesNameList.forEach((routeName) => {
    let moduleExportList = '';

    // Filter the routes according to the routeName.// ask-not:change routeName to name only
    const filteredRoutes = routes.filter((route) => route.name === routeName);

    let handlerData = `const services = require('../services/${routeName}.service.js');\n\n`;
    // Each item in the filtered route will make a new handler function
    filteredRoutes.forEach((route) => {
      // destructuring request object
      // let keys = Object.keys(route.r_config);
      // keys = keys.map((key) => key.toLowerCase());
      // keys.sort();
      // let destructReq = keys.reduce((acc, curVal) => `${acc}${curVal}, `, '');
      // destructReq = destructReq.substring(0, destructReq.length - 2);
      // const handleReqString = `\n    const { ${destructReq} } = req;`;
      moduleExportList += `${route.name}${route.method.toLowerCase()}Handler, `;
      handlerData += `const ${route.name}${route.method.toLowerCase()}Handler = async (req, res) => {
  try {`;

      handlerData += `\n    const result = await services.${route.name}${route.method.toLowerCase()}Service(req);\n`;

      // Add statement to send the last refName of sortedList as response
      handlerData += `    res.status(200).json({ data: result });
  } catch (error) {\n    res.status(500).json({ message: error });
  }\n};\n\n`;
    });

    // Add statement to export modules(functions) from the handler file
    handlerData += `module.exports = { ${moduleExportList.substring(0, moduleExportList.length - 2)} };\n`;
    // handlerData = prettifyJsText(handlerData);
    fs.writeFile(`${projectPath}/src/handlers/${routeName}.handler.js`, handlerData);
  });
};

module.exports = { updateHandler };
