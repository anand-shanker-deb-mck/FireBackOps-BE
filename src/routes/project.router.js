const express = require('express');
const { authenticateJwt } = require('../middlewares/auth.middleware');
const projectHandler = require('../handlers');
const {
  getProjectByIdValidator,
  getProjectValidator,
  createProjectValidator,
  updateProjectValidator,
  deleteProjectValidator,
} = require('../middlewares/project/project.validator');

const router = express.Router();
router.get('/user/:id', getProjectValidator, authenticateJwt, projectHandler.getAllProjectsHandler);
router.get('/:id', getProjectByIdValidator, projectHandler.getProjectByIdHandler);
router.post('/', createProjectValidator, authenticateJwt, projectHandler.createProjectHandler);
router.put('/:id', updateProjectValidator, projectHandler.updateProjectHandler);
router.delete('/', projectHandler.deleteProjectHandler);
router.delete('/:id', deleteProjectValidator, projectHandler.deleteProjectByIdHandler);

module.exports = { router };
