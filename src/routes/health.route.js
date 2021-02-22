const express = require('express');

const router = express.Router();
const { healthHandler } = require('../handlers/health.handler');

router.get('', healthHandler);

module.exports = {
  router,
};
