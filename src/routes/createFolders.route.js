const express = require('express');
const { createFoldersValidator } = require('../middlewares/createFolders.validator');

const router = express.Router();
const { createFoldersHandler } = require('../handlers/createFolders.handler');

router.post('', createFoldersValidator, createFoldersHandler);

module.exports = {
  router,
};
