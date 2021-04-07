const express = require('express');
const {
  addNewRouteHandler, getAllRoutesByProjectIDHandler, updateRouteHandler, getRouteDetailsHandler,
} = require('../handlers/route.handler');
const {
  createRouteValidator,
  getRoutesByProjectIDValidator,
  updateRouteValidator,
  getRouteDetailsValidator,
} = require('../middlewares/route.validator');
const { authenticateJwt } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('', createRouteValidator, authenticateJwt, addNewRouteHandler);
router.get('/:pid', getRoutesByProjectIDValidator, authenticateJwt, getAllRoutesByProjectIDHandler);
router.get('/routeDetails/:id', getRouteDetailsValidator, authenticateJwt, getRouteDetailsHandler);
router.put('/:id', updateRouteValidator, updateRouteHandler);
module.exports = {
  router,
};
