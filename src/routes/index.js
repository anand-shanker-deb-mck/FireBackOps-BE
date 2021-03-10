const express = require('express');
const swaggerUi = require('swagger-ui-express');
const { router: healthRouter } = require('./health.route');
const { router: loginRouter } = require('./login.route');
const { router: routeRouter } = require('./route.route');
const { router: projectRouter } = require('./newProject.route');
const { router: storeConfigRouter } = require('./storeConfig.route');

const router = express.Router();
const swaggerDocument = require('../swagger.json');

router.use('/ping', healthRouter);
router.use('/config', storeConfigRouter);
router.use('/login', loginRouter);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use('/project', projectRouter);
router.use('/route', routeRouter);

module.exports = {
  router,
};
