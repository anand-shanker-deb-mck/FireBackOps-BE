const express = require('express');

const router = express.Router();
const { healthHandler } = require('../handlers');

router.get('', healthHandler);

module.exports = {
  router,
};
