const fs = require('../../utils/fileSystem');
const { prettifyJsText } = require('../../utils/jsFormatter');

const updateHandler = async (projectName, routesNameList, componentList, projectPath) => {
  const { routes } = componentList;
  // routeNameList to identify what all routes are to be seperated
  // Each route will make a different route file
  routesNameList.forEach((routeName) => {
    let moduleExportList = '';

    // Filter the routes according to the routeName.// ask-not:change routeName to name only
    const filteredRoutes = routes.filter((route) => route.name === routeName);

    let handlerData = `const services = require("../services/${routeName}.service.js");\n\n`;

    // Each item in the filtered route will make a new handler function
    filteredRoutes.forEach((route, i) => {
      moduleExportList += `${route.name}${route.method.toLowerCase()}Handler`;
      if (i === filteredRoutes.length - 1) {
        moduleExportList += ' ';
      } else {
        moduleExportList += ', ';
      }

      // Start of handler function
      handlerData += `const ${route.name}${route.method.toLowerCase()}Handler = (req, res) => {\n`;
      handlerData += `try {\n    const result = services.${route.name}${route.method.toLowerCase()}Service();\n`;
      handlerData += '    res.status(200).send(result);\n  }';
      handlerData += ' catch (error) {\n    res.status(500).send(error);\n  }\n};\n\n';
    });

    // Add statement to export modules(functions) from the handler file
    handlerData += `module.exports = { ${moduleExportList}};\n`;
    handlerData = prettifyJsText(handlerData);
    fs.writeFile(`${projectPath}/src/handlers/${routeName}.handler.js`, handlerData);
  });
};

module.exports = { updateHandler };
