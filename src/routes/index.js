const express = require('express');
const swaggerUi = require('swagger-ui-express');
const { router: healthRouter } = require('./health.route');
const { router: createFoldersRouter } = require('./createFolders.route');
const { router: githubPushRouter } = require('./githubPush.route');
const { router: loginRouter } = require('./login.route');
const { router: routeRouter } = require('./route.route');
const { router: projectRouter } = require('./newProject.route');
const { router: configRouter } = require('./config.route');

const router = express.Router();
const swaggerDocument = require('../swagger.json');

router.use('/ping', healthRouter);
router.use('/config', configRouter);
router.use('/login', loginRouter);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use('/project', projectRouter);
router.use('/route', routeRouter);
router.use('/createFolders', createFoldersRouter);
router.use('/githubPush', githubPushRouter);

module.exports = {
  router,
};
