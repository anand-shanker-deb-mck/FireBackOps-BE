const express = require('express');

const router = express.Router();
const { storeConfigHandler, updateConfigHandler } = require('../handlers');
const { storeConfigValidator, payloadValidator, updateConfigValidator } = require('../middlewares/config/config.validator');
const { authenticateJwt } = require('../middlewares/auth.middleware');

router.post('', authenticateJwt, storeConfigValidator, payloadValidator, storeConfigHandler);
router.patch('', authenticateJwt, updateConfigValidator, payloadValidator, updateConfigHandler);
module.exports = {
  router,
};
