const { githubPushSchema } = require('./githubPush.validation.schema');

// eslint-disable-next-line consistent-return
const githubPushValidator = (req, res, next) => {
  const { body } = req;
  // eslint-disable-next-line no-unused-vars
  const { value, error } = githubPushSchema.validate(body);
  if (error) {
    return res.status(400).send('Bad Request');
  }
  next();
};

module.exports = {
  githubPushValidator,
};
