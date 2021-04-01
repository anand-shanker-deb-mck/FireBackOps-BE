const fs = require('fs');
const fsUtil = require('../utils/file.util');
const { indexContent } = require('../templates/index.template');
const {
  setupRouter, exportRouter, createRoute, createRouteHandler,
} = require('../templates/route.template');
const {
  createRouteService,
  createRouteHandlerPart1,
  createRouteHandlerPart2,
  createRouteHandlerPart3,
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
  await fsUtil.appendFile(`${projectPath}/src/handlers/${routeArray[0].method}${routeArray[0].name}Handlers.js`, createRouteService(routeArray[0].method, routeArray[0].name));
  await fsUtil.appendFile(`${projectPath}/src/handlers/${routeArray[0].method}${routeArray[0].name}Handlers.js`, createRouteHandlerPart1(routeArray[0].method, routeArray[0].name));
  await fsUtil.appendFile(`${projectPath}/src/handlers/${routeArray[0].method}${routeArray[0].name}Handlers.js`, createRouteHandlerPart2(routeArray[0].method, routeArray[0].name, routeConfig));
  await fsUtil.appendFile(`${projectPath}/src/handlers/${routeArray[0].method}${routeArray[0].name}Handlers.js`, createRouteHandlerPart3());
  await fsUtil.appendFile(`${projectPath}/src/handlers/${routeArray[0].method}${routeArray[0].name}Handlers.js`, exportHandler(routeArray[0].method, routeArray[0].name));
};

module.exports = { generateCodeService };
