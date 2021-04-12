const services = require('./generateFilesAndFolders');
const service = require('./generateCommonFunctions');

const createProjectTemplate = (projectName, routeName, projectPath, componentList) => {
  services.generateProjectFolderStructure(projectName, projectPath);
  services.generateFileStructure(projectName, routeName, projectPath);
  service.generateCommonFunction(projectName, projectPath, componentList);
};

// createProjectTemplate('12345678', ['123456u']);

module.exports = { createProjectTemplate };
