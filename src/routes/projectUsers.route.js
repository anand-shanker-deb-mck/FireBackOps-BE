const express = require('express');
const { authenticateJwt } = require('../middlewares/auth.middleware');
const projectUsersHandler = require('../handlers/projectUsers.handler');
const { projectUsersValidator } = require('../middlewares/projectUsers.validator');

const router = express.Router();

router.get('/:id', projectUsersValidator, authenticateJwt, projectUsersHandler.getUserNames);

module.exports = { router };
