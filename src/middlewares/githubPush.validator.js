/* eslint-disable consistent-return */
const { githubPRSchema } = require('./githubPR.validation.schema');
const { githubPushSchema } = require('./githubPush.validation.schema');

const githubPushValidator = (req, res, next) => {
  const { body } = req;
  const validate = githubPushSchema.validate(body);
  if (validate.error) {
    return res.status(400).send('Bad Request');
  }
  next();
};

const githubPRValidator = (req, res, next) => {
  const { body } = req;
  const validate = githubPRSchema.validate(body);
  if (validate.error) {
    return res.status(400).send('Bad Request');
  }
  next();
};

module.exports = {
  githubPushValidator, githubPRValidator,
};
