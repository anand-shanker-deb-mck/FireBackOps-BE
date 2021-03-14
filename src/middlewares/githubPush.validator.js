const { githubPushSchema } = require('./githubPush.validation.schema');

// eslint-disable-next-line consistent-return
const githubPushValidator = (req, res, next) => {
  const { body } = req;
  const validate = githubPushSchema.validate(body);
  if (validate.error) {
    return res.status(400).send('Bad Request');
  }
  next();
};

module.exports = {
  githubPushValidator,
};
