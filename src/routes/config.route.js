const express = require('express');

const router = express.Router();
const { updateConfigHandler } = require('../handlers');
const { payloadValidator, updateConfigValidator } = require('../middleware/validation/validator');

router.patch('', updateConfigValidator, payloadValidator, updateConfigHandler);

module.exports = {
  router,
};
