/* eslint-disable no-param-reassign */
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

const updateHandlerAndDependency = async (routes = ['flight', 'hotel'], projectName = 'generatedFolderA', result, projectPath) => {
  await generateFileAndFolderService.createProjectTemplate(
    projectName,
    routes,
    projectPath,
    result,
  );
  // result = await fse.readJson('input.json');
  // ask1: should be doing it the last?
  // updateDependencyService.updatePackageJson(projectName, result, projectPath);
  updateHandlerService.updateHandler(projectName, routes, result, projectPath);
  updateRouteService.updateRoutes(projectName, routes, result, projectPath);
  updateRouteService.updateRouteIndex(projectName, routes, projectPath);
  exec(`npx eslint --fix ${projectPath}/src`);
};

module.exports = {
  updateHandlerAndDependency,
  getAllUsers, // ask3: why this?
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
