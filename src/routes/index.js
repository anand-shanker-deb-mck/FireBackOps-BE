const { router: healthRouter } = require('./health.route');
const { router: createFoldersRouter } = require('./createFolders.route');
const { router: githubPushRouter } = require('./githubPush.route');

module.exports = {
  healthRouter, createFoldersRouter, githubPushRouter,
};
