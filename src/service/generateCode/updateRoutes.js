const fs = require('../../utils/fileSystem');

const updateRouteContent = (routeName, componentList) => {
  const { routes } = componentList;
  let routerMethodCallsCode = '';

  // generate code for each route file
  // filter by routeName
  const filteredRoutes = routes.filter((route) => route.name === routeName);

  filteredRoutes.forEach((route) => {
    routerMethodCallsCode += `\n${routeName}Router.${route.method.toLowerCase()}('/${(route.end_point === '/') ? '' : route.end_point}', ${routeName}Handler.${route.name}${route.method.toLowerCase()}Handler);\n`;
  });

  const routeFileCode = `const express = require('express');\nconst ${routeName}Handler = require('../handlers/${routeName}.handler.js');\n\nconst ${routeName}Router = express.Router();\n${routerMethodCallsCode}\nmodule.exports = {
  ${routeName}Router,
};
`;

  return routeFileCode;
};

const updateRouteIndex = async (projectName, routes, projectPath) => {
  let routerCode = '';
  let moduleExportsCode = '';

  routes.forEach((route) => {
    routerCode += `const { ${route}Router } = require('./${route}.route');\n`;
    moduleExportsCode += `${route}Router, `;
  });

  const indexFileCode = `${routerCode}module.exports = { ${moduleExportsCode} }`;

  await fs.writeFile(`${projectPath}/src/routes/index.js`, indexFileCode);
};

const updateRoutes = async (projectName, routes, componentList, projectPath) => {
  routes.forEach(async (routeName) => {
    await fs.writeFile(`${projectPath}/src/routes/${routeName}.route.js`, updateRouteContent(routeName, componentList));
  });
};

module.exports = { updateRoutes, updateRouteIndex };
