const latestVersion = require('latest-version');
const fs = require('../../utils/fileSystem');
const fileServices = require('../../utils/file.util');

const updatePackageJson = async (projectName, componentList, projectPath) => {
  let packageJsonFileData = '';
  packageJsonFileData = await fileServices.readFile(`${projectPath}/package.json`);
  packageJsonFileData = JSON.parse(packageJsonFileData);
  const projectNodeModules = {};
  componentList.routes.forEach((route) => {
    route.configurations.forEach((configuration) => {
      if (configuration.componentType === 'API' && projectNodeModules.axios === undefined) {
        projectNodeModules.axios = 1;
      } else {
        configuration.payload.nodeModules.forEach((nodeModule) => {
          if (projectNodeModules[nodeModule] === undefined) {
            projectNodeModules[nodeModule] = 1;
          }
        });
      }
    });
  });
  const nodeModuleVersionsPromise = Object.keys(projectNodeModules)
    .map((nodeModule) => latestVersion(nodeModule));

  const nodeModuleVersions = await Promise.all(nodeModuleVersionsPromise);
  packageJsonFileData.dependencies = Object.keys(projectNodeModules)
    .reduce((allNodeModules, nodeModule, index) => {
      const copyAllNodeModules = { ...allNodeModules };
      copyAllNodeModules[nodeModule] = nodeModuleVersions[index];
      return copyAllNodeModules;
    }, packageJsonFileData.dependencies);
  await fs.writeFile(`${projectPath}/package.json`, JSON.stringify(packageJsonFileData, null, 4));
};

module.exports = { updatePackageJson };
