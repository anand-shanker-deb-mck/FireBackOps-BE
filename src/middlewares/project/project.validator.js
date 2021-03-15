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
  const validate = deleteProjectSchema.validate(params);
  if (validate.error) {
    return res.status(400).json({ message: 'Invalid Input' });
  }
  next();
};
const updateProjectValidator = (req, res, next) => {
  const { body } = req;
  const validate = updateProjectSchema.validate(body);
  if (validate.error) {
    return res.status(400).json({ message: 'Invalid body' });
  }
  next();
};

const createProjectValidator = (req, res, next) => {
  const { body } = req;
  const validate = createProjectSchema.validate(body);
  if (validate.error) {
    return res.status(400).json({ message: 'Invalid body' });
  }
  next();
};
const getProjectByIdValidator = (req, res, next) => {
  const { params } = req;
  const validate = getProjectByIdSchema.validate(params);
  if (validate.error) {
    return res.status(400).json({ message: 'Invalid params' });
  }
  next();
};
const getProjectValidator = (req, res, next) => {
  const { params } = req;
  const validate = getAllProjectsSchema.validate(params);
  if (validate.error) {
    return res.status(400).json({ message: 'Invalid body' });
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
