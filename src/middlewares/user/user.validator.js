/* eslint-disable consistent-return */
const {
  createUserSchema,
  getUserSchema,
} = require('./user.validation.schema');

const createUserValidator = (req, res, next) => {
  const { body } = req;
  const { error } = createUserSchema.validate(body);
  if (error) {
    return res.status(400).json({ message: JSON.stringify(error.details) });
  }
  next();
};

const getUserValidator = (req, res, next) => {
  const { params } = req;
  const { error } = getUserSchema.validate(params);
  if (error) {
    res.status(400).send({ message: JSON.stringify(error.details) });
    return;
  }
  next();
};

module.exports = {
  getUserValidator,
  createUserValidator,
};
