const express = require('express');

const router = express.Router();
const { healthHandler } = require('../handlers/health.handler');
const { createFiles } = require('../handlers/fileGeneration.handler');

router.get('', healthHandler);
router.post('/project', createFiles);

// Add an endpoint which when passed with necessary info (project id, component input, etc)
// generates the directory named with projectName containing
// a set of files index.js, helpers.js and package.json

module.exports = {
  router,
};
