const express = require('express');

const router = express.Router();
const { storeConfigHandler } = require('../handlers');
const { storeConfigValidator, payloadValidator } = require('../middleware/validation/validator');

router.post('', storeConfigValidator, payloadValidator, storeConfigHandler);

module.exports = {
  router,
};
