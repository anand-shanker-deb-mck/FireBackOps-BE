const fs = require('fs');
const fsUtil = require('../utils/file.util');
const { indexContent } = require('../templates/index.template');
const {
  setupRouter, exportRouter, createRoute, createRouteHandler,
} = require('../templates/route.template');

const generateCodeService = async (path, projectName, routeArray) => {
  const projectPath = `${path}/${projectName}`;
  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath);
  }
  if (!fs.existsSync(`${projectPath}/src`)) {
    fs.mkdirSync(`${projectPath}/src`);
  }
  await fsUtil.writeFile(`${projectPath}/src/index.js`, indexContent());

  if (!fs.existsSync(`${projectPath}/src/routes`)) {
    fs.mkdirSync(`${projectPath}/src/routes`);
  }
  await fsUtil.appendFile(`${projectPath}/src/routes/index.js`, setupRouter());

  const routeHandlerArray = routeArray.map(
    (routeObj) => createRouteHandler(routeObj.method, routeObj.name),
  );

  const routeStringArray = routeArray.map(
    (routeObj) => createRoute(routeObj.method, routeObj.name, routeObj.path),
  );

  await Promise.all(routeHandlerArray.map(async (data) => {
    await fsUtil.appendFile(`${projectPath}/src/routes/index.js`, data);
    return 'success';
  }));
  await Promise.all(routeStringArray.map(async (data) => {
    await fsUtil.appendFile(`${projectPath}/src/routes/index.js`, data);
    return 'success';
  }));

  await fsUtil.appendFile(`${projectPath}/src/routes/index.js`, exportRouter());
};

module.exports = { generateCodeService };
