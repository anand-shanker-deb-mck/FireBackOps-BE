const fse = require('fs-extra');
const fs = require('../utils/fileSystem');

const updatePackageJson = async (projectName) => {
  const configurationList = await fse.readJson('input.json');
  const packageJsonFileData = await fse.readJson(`${projectName}/package.json`);
  configurationList.reduce((acc, component) => {
    Object.keys(component.payload.nodeModules).forEach((key) => {
      acc[key] = component.payload.nodeModules[key];
    });
    return acc;
  }, packageJsonFileData.dependencies);
  await fs.writeFile(`${projectName}/package.json`, JSON.stringify(packageJsonFileData, null, 4));
};

module.exports = { updatePackageJson };
