const { createFoldersSchema } = require('./createFolders.validation.schema');

// eslint-disable-next-line consistent-return
const createFoldersValidator = (req, res, next) => {
  const { body } = req;
  // eslint-disable-next-line no-unused-vars
  const { value, error } = createFoldersSchema.validate(body);
  if (error) {
    return res.status(400).send('Bad Request');
  }
  next();
};

module.exports = {
  createFoldersValidator,
};
