const { healthHandler } = require('./health.handler');
const { getAllUsersHandler, getUsersByIdHandler, createUserHandler } = require('./user.handler');
const {
  getAllProjectsHandler, getProjectByIdHandler, createProjectHandler,
  deleteProjectHandler,
  deleteProjectByIdHandler,
  updateProjectHandler,
} = require('./project.handler');
const { updateConfigHandler } = require('./config.handler');
const { storeConfigHandler } = require('./config.handler');
const { addNewRouteHandler, getAllRoutesHandler, updateRouteHandler } = require('./route.handler');

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
};
