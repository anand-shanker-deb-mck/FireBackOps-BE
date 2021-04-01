const fs = require('fs');
const fsUtil = require('../utils/file.util');
const { indexContent } = require('../templates/index.template');
const {
  setupRouter, exportRouter, createRoute, createRouteHandler,
} = require('../templates/route.template');
const {
  createRouteService,
  createTryTempPart1,
  createTryTempPart2,
  createCatchTemp,
  exportHandler,
} = require('../templates/handler.template');

const generateCodeService = async (path, projectName, routeArray, routeConfig) => {
  const projectPath = `${path}/${projectName}`;
  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath);
  }
  if (!fs.existsSync(`${projectPath}/src`)) {
    fs.mkdirSync(`${projectPath}/src`);
  }
  await fsUtil.writeFile(`${projectPath}/src/index.js`, indexContent());
  // get routes and r-config from isha's function
  if (!fs.existsSync(`${projectPath}/src/routes`)) {
    fs.mkdirSync(`${projectPath}/src/routes`);
  }
  await fsUtil.appendFile(`${projectPath}/src/routes/index.js`, setupRouter());

  const routeHandlerString = routeArray.reduce(
    (acc, routeObj) => acc + createRouteHandler(routeObj.method, routeObj.name), '',
  );

  const routeString = routeArray.reduce(
    (acc, routeObj) => acc + createRoute(routeObj.method, routeObj.name, routeObj.path), '',
  );

  await fsUtil.appendFile(`${projectPath}/src/routes/index.js`, routeHandlerString);
  await fsUtil.appendFile(`${projectPath}/src/routes/index.js`, routeString);

  await fsUtil.appendFile(`${projectPath}/src/routes/index.js`, exportRouter());

  // create handlers folder
  if (!fs.existsSync(`${projectPath}/src/handlers`)) {
    fs.mkdirSync(`${projectPath}/src/handlers`);
  }
  routeArray.forEach(async (route) => {
    await fsUtil.appendFile(`${projectPath}/src/handlers/${route.method}${route.name}Handlers.js`, createRouteService(route.method, route.name));
    await fsUtil.appendFile(`${projectPath}/src/handlers/${route.method}${route.name}Handlers.js`, createTryTempPart1(route.method, route.name));
    await fsUtil.appendFile(`${projectPath}/src/handlers/${route.method}${route.name}Handlers.js`, createTryTempPart2(route.method, route.name, routeConfig));
    await fsUtil.appendFile(`${projectPath}/src/handlers/${route.method}${route.name}Handlers.js`, createCatchTemp());
    await fsUtil.appendFile(`${projectPath}/src/handlers/${route.method}${route.name}Handlers.js`, exportHandler(route.method, route.name));
  });
};

module.exports = { generateCodeService };
