const fse = require('fs-extra');
const fs = require('../../utils/fileSystem');

const updatePackageJson = async (projectName, componentList, projectPath) => {
  const packageJsonFileData = await fse.readJson(`${projectPath}/package.json`);
  // Appending new node modules to existing dependencies in the package123.json
  componentList.routes.reduce((acc, route) => {
    (route.configurations).forEach((configuration) => Object
      .keys(configuration.payload.nodeModules)
      .forEach((key) => {
        acc[key] = configuration.payload.nodeModules[key];
      }));
    return acc;
  }, packageJsonFileData.dependencies);

  fs.writeFile(`${projectPath}/package.json`, JSON.stringify(packageJsonFileData, null, 4));
};

module.exports = { updatePackageJson };
