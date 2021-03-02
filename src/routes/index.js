const { router: healthRouter } = require('./health.route');
const { router: loginRouter } = require('./login.route');

module.exports = {
  healthRouter, loginRouter,
};
