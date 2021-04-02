const fs = require('fs');
const fsUtil = require('../utils/file.util');
const createFolderService = require('../service/createFolders.service');
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

const generateCodeService = async (projectId, path) => {
  const result = await createFolderService.getRouteDetailsService(projectId);
  console.log(result.routes[0].configurations);
  const projectPath = `${path}/${result.projectName}`;
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath);
  }
  if (!fs.existsSync(`${projectPath}/src`)) {
    fs.mkdirSync(`${projectPath}/src`);
  }
  await fsUtil.writeFile(`${projectPath}/src/index.js`, indexContent());
  // get routes and r-config from createFolderService function
  if (!fs.existsSync(`${projectPath}/src/routes`)) {
    fs.mkdirSync(`${projectPath}/src/routes`);
  }
  await fsUtil.appendFile(`${projectPath}/src/routes/index.js`, setupRouter());

  const routeHandlerString = result.routes.reduce(
    (acc, routeObj) => acc + createRouteHandler(routeObj.method, routeObj.name), '',
  );

  const routeString = result.routes.reduce(
    (acc, routeObj) => acc + createRoute(routeObj.method, routeObj.name, routeObj.end_point), '',
  );

  await fsUtil.appendFile(`${projectPath}/src/routes/index.js`, routeHandlerString);
  await fsUtil.appendFile(`${projectPath}/src/routes/index.js`, routeString);

  await fsUtil.appendFile(`${projectPath}/src/routes/index.js`, exportRouter());

  // create handlers folder
  if (!fs.existsSync(`${projectPath}/src/handlers`)) {
    fs.mkdirSync(`${projectPath}/src/handlers`);
  }
  result.routes.forEach(async (route) => {
    await fsUtil.appendFile(`${projectPath}/src/handlers/${route.method}${route.name}Handler.js`, createRouteService(route.method, route.name));
    await fsUtil.appendFile(`${projectPath}/src/handlers/${route.method}${route.name}Handler.js`, createTryTempPart1(route.method, route.name));
    await fsUtil.appendFile(`${projectPath}/src/handlers/${route.method}${route.name}Handler.js`, createTryTempPart2(route.method, route.name, route.r_config));
    await fsUtil.appendFile(`${projectPath}/src/handlers/${route.method}${route.name}Handler.js`, createCatchTemp());
    await fsUtil.appendFile(`${projectPath}/src/handlers/${route.method}${route.name}Handler.js`, exportHandler(route.method, route.name));
  });
};

module.exports = { generateCodeService };
