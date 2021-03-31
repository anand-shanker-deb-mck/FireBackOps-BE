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

  const routeHandlerString = routeArray.reduce(
    (acc, routeObj) => acc + createRouteHandler(routeObj.method, routeObj.name), '',
  );

  const routeString = routeArray.reduce(
    (acc, routeObj) => acc + createRoute(routeObj.method, routeObj.name, routeObj.path), '',
  );

  await fsUtil.appendFile(`${projectPath}/src/routes/index.js`, routeHandlerString);
  await fsUtil.appendFile(`${projectPath}/src/routes/index.js`, routeString);

  await fsUtil.appendFile(`${projectPath}/src/routes/index.js`, exportRouter());
};

module.exports = { generateCodeService };
