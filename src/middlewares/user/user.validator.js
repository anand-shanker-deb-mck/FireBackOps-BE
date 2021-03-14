/* eslint-disable consistent-return */
const {
  createUserSchema,
  getUserSchema,
} = require('./user.validation.schema');

const createUserValidator = (req, res, next) => {
  const { body } = req;
  const validate = createUserSchema.validate(body);
  if (validate.error) {
    return res.status(400).json({ message: 'Invalid body' });
  }
  next();
};

const getUserValidator = (req, res, next) => {
  const { params } = req;
  const { error } = getUserSchema.validate(params);
  if (error) {
    res.status(400).send('Bad Request!');
    return;
  }
  next();
};

module.exports = {
  getUserValidator,
  createUserValidator,
};
