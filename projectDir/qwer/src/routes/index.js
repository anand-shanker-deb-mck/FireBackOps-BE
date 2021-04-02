const express = require('express');

const router = express.Router();
const {
  getR1Handler,
} = require('../handlers/getR1Handler');

const {
  postR2Handler,
} = require('../handlers/postR2Handler');

router.get('/', getR1Handler);
router.post('/:id', postR2Handler);

module.exports = {
  router,
};
const express = require('express');

const router = express.Router();
const {
  getR1Handler,
} = require('../handlers/getR1Handler');

const {
  postR2Handler,
} = require('../handlers/postR2Handler');

router.get('/', getR1Handler);
router.post('/:id', postR2Handler);

module.exports = {
  router,
};
const express = require('express');

const router = express.Router();
const {
  getR1Handler,
} = require('../handlers/getR1Handler');

const {
  postR2Handler,
} = require('../handlers/postR2Handler');

router.get('/', getR1Handler);
router.post('/:id', postR2Handler);

module.exports = {
  router,
};
