const express = require('express');
const { authenticateJwt } = require('../middlewares/auth.middleware');
const { routeConfigValidator } = require('../middlewares/routeConfig.validator');

const router = express.Router();
const { routeConfigHandler } = require('../handlers/routeConfig.handler');

router.get('/:id', authenticateJwt, routeConfigValidator, routeConfigHandler);

module.exports = {
  router,
};
