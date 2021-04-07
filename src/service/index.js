const {
  getAllProjects, getProjectById, createProject,
  deleteAllProjects,
  deleteProjectById,
  updateProject,
} = require('./project.service');
const {
  getAllUsers, getUserById, createUser, getUserDetails,
} = require('./user.service');
const { createUserProject } = require('./user_project.service');

const updateHandlerService = require('./generateCode/updateHandler');
// const updateDependencyService = require('./generateCode/updatePackageJson');
const updateRouteService = require('./generateCode/updateRoutes');
const generateFileAndFolderService = require('./generateFileAndFolders/index');
const updateServicesService = require('./generateCode/updateService');

const updateHandlerAndDependency = async (routes , projectName , result, projectPath) => {
  await generateFileAndFolderService.createProjectTemplate(
    projectName,
    routes,
    projectPath,
    result,
  );
  // await updateDependencyService.updatePackageJson(projectName, result, projectPath);
  await updateHandlerService.updateHandler(projectName, routes, result, projectPath);
  await updateServicesService.updateService(projectName, routes, result, projectPath);
  await updateRouteService.updateRoutes(projectName, routes, result, projectPath);
  await updateRouteService.updateRouteIndex(projectName, routes, projectPath);
};

module.exports = {
  updateHandlerAndDependency,
  getAllUsers,
  getUserById,
  getAllProjects,
  getProjectById,
  createUser,
  createProject,
  deleteAllProjects,
  deleteProjectById,
  updateProject,
  getUserDetails,
  createUserProject,
};
