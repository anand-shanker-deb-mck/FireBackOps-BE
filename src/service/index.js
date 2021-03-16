const { exec } = require('child_process');
const fse = require('fs-extra');
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
const updateDependencyService = require('./generateCode/updatePackageJson');
const updateRouteService = require('./generateCode/updateRoutes');
const generateFileAndFolderService = require('./generateFileAndFolders/index');

const updateHandlerAndDependency = async (routes = ['flight', 'hotel'], projectName = 'generatedFolder') => {
  generateFileAndFolderService.createProjectTemplate(projectName, routes);
  const componentList = await fse.readJson('input.json');
  updateDependencyService.updatePackageJson(projectName, componentList);
  updateHandlerService.updateHandler(projectName, routes, componentList);
  updateRouteService.updateRoutes(projectName, routes, componentList);
  updateRouteService.updateRouteIndex(projectName, routes);
  exec(`npx eslint --fix ${projectName}/src`);
};

updateHandlerAndDependency();

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
