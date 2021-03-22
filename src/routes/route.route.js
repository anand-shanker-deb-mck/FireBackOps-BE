const express = require('express');
const { addNewRouteHandler, getAllRoutesByProjectIDHandler, updateRouteHandler } = require('../handlers/route.handler');
const {
  createRouteValidator,
  getRoutesByProjectIDValidator,
  updateRouteValidator,
} = require('../middlewares/route.validator');
const { authenticateJwt } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('', createRouteValidator, authenticateJwt, addNewRouteHandler);
router.get('/:pid', getRoutesByProjectIDValidator, authenticateJwt, getAllRoutesByProjectIDHandler);
router.put('/:id', updateRouteValidator, updateRouteHandler);
module.exports = {
  router,
};
