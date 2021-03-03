const { storeConfigDBSchema, apiSchema } = require('./schema');

const storeConfigValidator = (req, res, next) => {
  const { body } = req;
  const { error } = storeConfigDBSchema.validate(body);

  if (error) {
    res.status(400).json({ error: 'Invalid component' });
  }
  next();
};

const payloadValidator = (req, res) => {
  const { body } = req;
  const { payload } = body;
  if (body.type === 'API') {
    const { error } = apiSchema.validate(payload);

    if (error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(200).json({ message: 'Valid payload' });
    }
    // next();
  }
};

module.exports = { storeConfigValidator, payloadValidator };
