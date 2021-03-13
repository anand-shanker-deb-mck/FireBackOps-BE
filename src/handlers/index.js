const { healthHandler } = require('./health.handler');
const { storeConfigHandler, updateConfigHandler } = require('./config.handler');
const { addNewRouteHandler, getAllRoutesHandler, updateRouteHandler } = require('./route.handler');

module.exports = {
  healthHandler,
  addNewRouteHandler,
  getAllRoutesHandler,
  updateRouteHandler,
  updateConfigHandler,
  storeConfigHandler,
};
