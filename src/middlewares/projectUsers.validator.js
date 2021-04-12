const { projectUsersSchema } = require('./projectUsers.validation.schema');

// eslint-disable-next-line consistent-return
const projectUsersValidator = (req, res, next) => {
  const { params } = req;
  const { error } = projectUsersSchema.validate(params);
  if (error) {
    return res.status(400).send({ message: JSON.stringify(error.details) });
  }
  next();
};

module.exports = {
  projectUsersValidator,
};
