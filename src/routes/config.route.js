const express = require('express');

const router = express.Router();
const { storeConfigHandler, updateConfigHandler } = require('../handlers');
const { storeConfigValidator, payloadValidator, updateConfigValidator } = require('../middleware/validation/validator');

router.post('', storeConfigValidator, payloadValidator, storeConfigHandler);
router.patch('', updateConfigValidator, payloadValidator, updateConfigHandler);
module.exports = {
  router,
};
