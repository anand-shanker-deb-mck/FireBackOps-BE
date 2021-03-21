const express = require('express');
const { authenticateJwt } = require('../middlewares/auth.middleware');
const { createUserProjectValidator } = require('../middlewares/user_project/user_project.validator');
const userProjectHandler = require('../handlers');

const router = express.Router();
router.post('', createUserProjectValidator, authenticateJwt, userProjectHandler.createUserProjectHandler);
module.exports = { router };
