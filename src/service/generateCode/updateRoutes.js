const fs = require('../../utils/fileSystem');

const updateRouteContent = (routeName, componentList) => {
  const { routes } = componentList;
  let routerMethodCallsCode = '';

  // generate code for each route file
  // filter by routeName
  const filteredRoutes = routes.filter((route) => route.routeName === routeName);

  filteredRoutes.forEach((route) => {
    routerMethodCallsCode += `${routeName}Router.${route.method.toLowerCase()}('/${routeName}', ${routeName}Handler.${route.routeName}${route.method.toLowerCase()}Handler);\n`;
  });

  const routeFileCode = `const express = require('express');\nconst ${routeName}Handler = require('../handlers/${routeName}.handler.js');\nconst ${routeName}Router = express.Router();\n${routerMethodCallsCode}module.exports = {
  ${routeName}Router,
  };
  `;

  return routeFileCode;
};

const updateRouteIndex = async (projectName, routes) => {
  let routerCode = '';
  let moduleExportsCode = '';

  routes.forEach((route) => {
    routerCode += `const { ${route}Router } = require('./${route}.route');\n`;
    moduleExportsCode += `${route}Router, `;
  });

  const indexFileCode = `${routerCode}module.exports = { ${moduleExportsCode} }`;

  await fs.writeFile(`${projectName}/src/routes/index.js`, indexFileCode);
};

const updateRoutes = async (projectName, routes, componentList) => {
  routes.forEach(async (routeName) => {
    await fs.writeFile(`${projectName}/src/routes/${routeName}.route.js`, updateRouteContent(routeName, componentList));
  });
};

module.exports = { updateRoutes, updateRouteIndex };
