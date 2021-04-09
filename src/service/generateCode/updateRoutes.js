const fs = require('../../utils/fileSystem');

const updateRouteContent = (routeName, componentList) => {
  const { routes } = componentList;
  let routerMethodCallsCode = '';

  // generate code for each route file
  // filter by routeName
  const filteredRoutes = routes.filter((route) => route.name === routeName);

  filteredRoutes.forEach((route) => {
    routerMethodCallsCode += `${routeName}Router.${route.method.toLowerCase()}('${route.end_point}', ${routeName}Handler.${route.name}${route.method.toLowerCase()}Handler);\n`;
  });

  const routeFileCode = `const express = require('express');\nconst ${routeName}Handler = require('../handlers/${routeName}.handler.js');\n\nconst ${routeName}Router = express.Router();\n\n${routerMethodCallsCode}\nmodule.exports = {
  ${routeName}Router,
};
`;
  return routeFileCode;
};

const updateRouteIndex = async (projectName, routes, projectPath) => {
  let routerCode = '';
  let moduleExportsCode = '';
  const uniqueRoute = routes.filter((route, index, self) => self.indexOf(route) === index);
  uniqueRoute.forEach((route) => {
    routerCode += `const { ${route}Router } = require('./${route}.route');\n`;
    moduleExportsCode += `${route}Router, `;
  });

  const indexFileCode = `${routerCode}\nmodule.exports = { ${moduleExportsCode.substring(0, moduleExportsCode.length - 2)} };\n`;

  await fs.writeFile(`${projectPath}/src/routes/index.js`, indexFileCode);
};

const updateRoutes = async (projectName, routes, componentList, projectPath) => {
  routes.forEach(async (routeName) => {
    await fs.writeFile(`${projectPath}/src/routes/${routeName}.route.js`, updateRouteContent(routeName, componentList));
  });
};

module.exports = { updateRoutes, updateRouteIndex };
