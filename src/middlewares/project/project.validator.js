/* eslint-disable consistent-return */
const {
  deleteProjectSchema,
  updateProjectSchema,
  createProjectSchema,
  getAllProjectsSchema,
  getProjectByIdSchema,
} = require('./project.validation.schema');

const deleteProjectValidator = (req, res, next) => {
  const { params } = req;
  const { error } = deleteProjectSchema.validate(params);
  if (error) {
    return res.status(400).json({ message: JSON.stringify(error.details) });
  }
  next();
};
const updateProjectValidator = (req, res, next) => {
  const { body } = req;
  const { error } = updateProjectSchema.validate(body);
  if (error) {
    return res.status(400).json({ message: JSON.stringify(error.details) });
  }
  next();
};

const createProjectValidator = (req, res, next) => {
  const { body } = req;
  const { error } = createProjectSchema.validate(body);
  if (error) {
    return res.status(400).json({ message: JSON.stringify(error.details) });
  }
  next();
};
const getProjectByIdValidator = (req, res, next) => {
  const { params } = req;
  const { error } = getProjectByIdSchema.validate(params);
  if (error) {
    return res.status(400).json({ message: JSON.stringify(error.details) });
  }
  next();
};
const getProjectValidator = (req, res, next) => {
  const { params } = req;
  const { error } = getAllProjectsSchema.validate(params);
  if (error) {
    return res.status(400).json({ message: JSON.stringify(error.details) });
  }
  next();
};

module.exports = {
  getProjectByIdValidator,
  getProjectValidator,
  createProjectValidator,
  updateProjectValidator,
  deleteProjectValidator,
};
