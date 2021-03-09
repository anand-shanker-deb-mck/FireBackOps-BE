const { healthHandler } = require('./health.handler');
const { addNewRouteHandler, getAllRoutesHandler, updateRouteHandler } = require('./route.handler');

module.exports = {
  healthHandler,
  addNewRouteHandler,
  getAllRoutesHandler,
  updateRouteHandler,
};
