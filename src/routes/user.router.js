const express = require('express');
const userHandler = require('../handlers');
const {
  getUserValidator,
  createUserValidator,
} = require('../middlewares/user/user.validator');

const router = express.Router();

router.get('/allusers', userHandler.getUserDetailsHandler);
router.get('/', userHandler.getAllUsersHandler);
router.get('/:id', getUserValidator, userHandler.getUsersByIdHandler);
router.post('/', createUserValidator, userHandler.createUserHandler);

module.exports = { router };
