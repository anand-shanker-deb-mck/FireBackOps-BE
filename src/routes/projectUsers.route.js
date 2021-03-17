const express = require('express');
const projectUsersHandler = require('../handlers/projectUsers.handler');
const { projectUsersValidator } = require('../middlewares/projectUsers.validator');

const router = express.Router();

router.get('/:id', projectUsersValidator, projectUsersHandler.getUserNames);

module.exports = { router };
