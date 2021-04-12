const { createFoldersSchema } = require('./createFolders.validation.schema');

// eslint-disable-next-line consistent-return
const createFoldersValidator = (req, res, next) => {
  const { body } = req;
  const { error } = createFoldersSchema.validate(body);
  if (error) {
    return res.status(400).send({ message: JSON.stringify(error.details) });
  }
  next();
};

module.exports = {
  createFoldersValidator,
};
