const { storeConfigDBSchema, apiSchema, mapperSchema } = require('./schema');

const storeConfigValidator = (req, res, next) => {
  const { body } = req;
  const { error } = storeConfigDBSchema.validate(body);

  if (error) {
    res.status(400).json({ error: 'Invalid component' });
    return;
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
      return;
    }
  } else if (body.type === 'MAPPER') {
    const { error } = mapperSchema.validate(payload);
    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }
  }
  res.status(200).json({ message: 'Valid payload' });
  // next();
};

module.exports = { storeConfigValidator, payloadValidator };
