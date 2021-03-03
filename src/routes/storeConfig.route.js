const express = require('express');

const router = express.Router();
const { storeConfigValidator, payloadValidator } = require('../middleware/validation/validator');

router.post('', storeConfigValidator, payloadValidator);

module.exports = {
  router,
};
