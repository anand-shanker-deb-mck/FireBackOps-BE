const express = require('express');
const fileHandlers = require('../handlers/newProject.handler');
const { postValidator } = require('../validations/newProject.validator');

const router = express.Router();
router.post('/', postValidator, fileHandlers.createProject);

module.exports = { router };
