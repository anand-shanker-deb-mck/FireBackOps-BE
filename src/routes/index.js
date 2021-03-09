const { router: healthRouter } = require('./health.route');
const { router: loginRouter } = require('./login.route');
const { router: projectRouter } = require('./newProject.route');
const { router: storeConfigRouter } = require('./storeConfig.route');

module.exports = {
  healthRouter,
  projectRouter,
  storeConfigRouter,
  loginRouter,
};
