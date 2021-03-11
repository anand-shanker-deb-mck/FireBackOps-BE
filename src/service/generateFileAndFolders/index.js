const services = require('./generateFilesAndFolders');
const service = require('./generateCommonFunctions');

const createProjectTemplate = (projectName, routeName) => {
  services.generateProjectFolderStructure(projectName);
  services.generateFileStructure(projectName, routeName);
  service.generateCommonFunction(projectName);
};
module.exports = { createProjectTemplate };
