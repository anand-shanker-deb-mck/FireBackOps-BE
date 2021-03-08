const services = require('./generateFilesAndFolders');

const createProjectTemplate = (projectName, routeName) => {
  services.generateProjectFolderStructure(projectName);
  services.generateFileStructure(projectName, routeName);
};

module.exports = { createProjectTemplate };
