/* eslint-disable no-unused-vars */
const { postBodySchema } = require('./newProject.validation.schema');

const postValidator = (req, res, next) => {
  const { body } = req;
  const { value, error } = postBodySchema.validate(body);
  if (error) {
    res.status(400).send('Bad Request!');
    return;
  }
  next();
};

module.exports = { postValidator };
