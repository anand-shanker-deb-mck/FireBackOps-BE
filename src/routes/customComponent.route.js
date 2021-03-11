const express = require('express');
const { storeCustomCompHandler } = require('../handlers/customComponent.handler');

const router = express.Router();

router.post('', storeCustomCompHandler);

module.exports = {
  router,
};
