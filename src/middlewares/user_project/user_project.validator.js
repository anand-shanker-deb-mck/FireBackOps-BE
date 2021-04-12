/* eslint-disable consistent-return */
const { createUserProjectSchema } = require('./user_project.validation.schema');

const createUserProjectValidator = (req, res, next) => {
  const { body } = req;
  const { error } = createUserProjectSchema.validate(body);
  if (error) {
    return res.status(400).json({ message: JSON.stringify(error.details) });
  }
  next();
};
module.exports = { createUserProjectValidator };
