const { createFoldersSchema } = require('./createFolders.validation.schema');

// eslint-disable-next-line consistent-return
const createFoldersValidator = (req, res, next) => {
  const { body } = req;
  const validate = createFoldersSchema.validate(body);
  if (validate.error) {
    return res.status(400).send('Bad Request');
  }
  next();
};

module.exports = {
  createFoldersValidator,
};
