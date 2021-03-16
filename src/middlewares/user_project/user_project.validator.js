/* eslint-disable consistent-return */
const { createUserProjectSchema } = require('./user_project.validation.schema');

const createUserProjectValidator = (req, res, next) => {
  const { body } = req;
  const validate = createUserProjectSchema.validate(body);
  if (validate.error) {
    return res.status(400).json({ message: 'Invalid body' });
  }
  next();
};
module.exports = { createUserProjectValidator };
