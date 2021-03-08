const { router: healthRouter } = require('./health.route');
const { router: storeConfigRouter } = require('./storeConfig.route');

module.exports = {
  healthRouter,
  storeConfigRouter,
};
