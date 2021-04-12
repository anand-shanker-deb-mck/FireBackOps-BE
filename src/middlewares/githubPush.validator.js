/* eslint-disable consistent-return */
const { githubPRSchema } = require('./githubPR.validation.schema');
const { githubPushSchema } = require('./githubPush.validation.schema');

const githubPushValidator = (req, res, next) => {
  const { body } = req;
  const { error } = githubPushSchema.validate(body);
  if (error) {
    return res.status(400).send({ message: JSON.stringify(error.details) });
  }
  next();
};

const githubPRValidator = (req, res, next) => {
  const { body } = req;
  const { error } = githubPRSchema.validate(body);
  if (error) {
    return res.status(400).send({ message: JSON.stringify(error.details) });
  }
  next();
};

module.exports = {
  githubPushValidator, githubPRValidator,
};
