const fs = require('../../utils/fileSystem');
const { readFile } = require('../../utils/file.util');

const updatePackageJson = async (projectName, componentList, projectPath) => {
  let packageJsonFileData = '';
  packageJsonFileData = await readFile(`${projectPath}/package.json`);
  packageJsonFileData = JSON.parse(packageJsonFileData);
  packageJsonFileData.dependencies = componentList.routes.reduce((acc, route) => {
    const copyProjectNodeModules = { ...acc };
    route.configurations.forEach((configuration) => {
      if (configuration.componentType === 'API' && copyProjectNodeModules.axios === undefined) {
        copyProjectNodeModules.axios = '^0.21.1';
      } else {
        configuration.payload.nodeModules.forEach((nodeModule) => {
          if (copyProjectNodeModules[Object.keys(nodeModule)[0]] === undefined
            || copyProjectNodeModules[Object.keys(nodeModule)[0]]
            < configuration.payload.nodeModules[nodeModule]) {
            copyProjectNodeModules[Object.keys(nodeModule)[0]] = configuration
              .payload.nodeModules[nodeModule];
          }
        });
      }
    });
    return copyProjectNodeModules;
  }, packageJsonFileData.dependencies);
  fs.writeFile(`${projectPath}/package.json`, JSON.stringify(packageJsonFileData, null, 4));
};

module.exports = { updatePackageJson };
