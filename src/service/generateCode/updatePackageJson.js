const fse = require('fs-extra');
const fs = require('../../utils/fileSystem');

const updatePackageJson = async (projectName, componentList) => {
  const packageJsonFileData = await fse.readJson(`${projectName}/package.json`);

  // Appending new node modules to existing dependencies in the package.json
  componentList.routes.reduce((acc, route) => {
    (route.configuration).forEach((configuration) => Object
      .keys(configuration.payload.nodeModules)
      .forEach((key) => {
        acc[key] = configuration.payload.nodeModules[key];
      }));
    return acc;
  }, packageJsonFileData.dependencies);

  fs.writeFile(`${projectName}/package.json`, JSON.stringify(packageJsonFileData, null, 4));
};

module.exports = { updatePackageJson };
