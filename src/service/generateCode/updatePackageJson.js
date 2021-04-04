const fse = require('fs-extra');
const fs = require('../../utils/fileSystem');

const updatePackageJson = async (projectName, componentList, projectPath) => {
  const packageJsonFileData = await fse.readJson(`${projectPath}/package.json`);
  // ask2: will it throw errors if there's no key as node modules
  // Appending new node modules to existing dependencies in the package123.json
  componentList.routes.reduce((acc, route) => {
    (route.configurations).forEach((configuration) => Object // make it configurations
      .keys(configuration.payload.nodeModules)
      .forEach((key) => {
        acc[key] = configuration.payload.nodeModules[key];
      }));
    return acc;
  }, packageJsonFileData.dependencies);

  fs.writeFile(`${projectPath}/package.json`, JSON.stringify(packageJsonFileData, null, 4));
};

module.exports = { updatePackageJson };
