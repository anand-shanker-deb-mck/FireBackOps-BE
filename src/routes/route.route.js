const express = require('express');
const { addNewRouteHandler, getAllRoutesHandler, updateRouteHandler } = require('../handlers');
const {
  createRouteValidator,
  updateRouteValidator,
} = require('../middlewares/route.validator');

const router = express.Router();

router.post('', createRouteValidator, addNewRouteHandler);
router.get('', getAllRoutesHandler);
router.put('/:id', updateRouteValidator, updateRouteHandler);
module.exports = {
  router,
};
