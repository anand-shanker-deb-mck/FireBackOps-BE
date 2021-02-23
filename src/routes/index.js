const { router: healthRouter } = require('./health.route');
const { router: githubRouter } = require('./github.route');

module.exports = {
  healthRouter, githubRouter,
};
