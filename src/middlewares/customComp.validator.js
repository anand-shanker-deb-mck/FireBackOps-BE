const { customCompSchema } = require('./customComp.schema');

const customCompValidator = (req, res, next) => {
  const { body } = req;
  const { error } = customCompSchema.validate(body);

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }
  next();
};

module.exports = { customCompValidator };
