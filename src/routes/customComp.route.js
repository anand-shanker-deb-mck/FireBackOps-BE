const express = require('express');
const { storeCustomCompHandler } = require('../handlers/customComp.handler');
const { customCompValidator } = require('../middlewares/customComp.validator');

const router = express.Router();
router.post('', customCompValidator, storeCustomCompHandler);
module.exports = {
  router,
};
