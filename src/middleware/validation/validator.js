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
  let error;
  if (body.type === 'API') {
    error = apiSchema.validate(payload).error;
  } else if (body.type === 'MAPPER') {
    error = mapperSchema.validate(payload).error;
  }
  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }
  res.status(200).json({ message: 'Valid payload' });
  // next();
};

module.exports = { storeConfigValidator, payloadValidator };
