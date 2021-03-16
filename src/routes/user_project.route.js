const express = require('express');
const { createUserProjectValidator } = require('../middlewares/user_project/user_project.validator');
const userProjectHandler = require('../handlers');

const router = express.Router();
router.post('', createUserProjectValidator, userProjectHandler.createUserProjectHandler);
module.exports = { router };
