const { healthHandler } = require('./health.handler');
const {
  getAllUsersHandler, getUsersByIdHandler, createUserHandler, getUserDetailsHandler,
} = require('./user.handler');

const {
  getAllProjectsHandler, getProjectByIdHandler, createProjectHandler,
  deleteProjectHandler,
  deleteProjectByIdHandler,
  updateProjectHandler,
} = require('./project.handler');
const { updateConfigHandler } = require('./config.handler');
const { storeConfigHandler } = require('./config.handler');
const { storeCustomCompHandler } = require('./customComp.handler');
const { addNewRouteHandler, getAllRoutesHandler, updateRouteHandler } = require('./route.handler');
const { createUserProjectHandler } = require('./user_project.handler');

module.exports = {
  healthHandler,
  getAllUsersHandler,
  getUsersByIdHandler,
  getAllProjectsHandler,
  getProjectByIdHandler,
  createUserHandler,
  createProjectHandler,
  deleteProjectHandler,
  deleteProjectByIdHandler,
  updateProjectHandler,
  addNewRouteHandler,
  getAllRoutesHandler,
  updateRouteHandler,
  updateConfigHandler,
  storeConfigHandler,
  storeCustomCompHandler,
  getUserDetailsHandler,
  createUserProjectHandler,
};
