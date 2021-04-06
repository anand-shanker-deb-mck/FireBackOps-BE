const express = require('express');

const router = express.Router();
const { storeConfigHandler, updateConfigHandler, deleteConfigHandler } = require('../handlers');
const {
  storeConfigValidator, payloadValidator, updateConfigValidator, deleteConfigValidator,
} = require('../middlewares/config/config.validator');
const { authenticateJwt } = require('../middlewares/auth.middleware');

router.post('', authenticateJwt, storeConfigValidator, payloadValidator, storeConfigHandler);
router.patch('', authenticateJwt, updateConfigValidator, payloadValidator, updateConfigHandler);
router.post('/deleteConfig', authenticateJwt, deleteConfigValidator, deleteConfigHandler);
module.exports = {
  router,
};
