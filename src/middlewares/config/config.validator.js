const {
  storeConfigDBSchema, apiSchema, mapperSchema, updateConfigDBSchema, deleteConfigDBSchema,
} = require('./config.validation.schema');

const storeConfigValidator = (req, res, next) => {
  const { body } = req;
  const { error } = storeConfigDBSchema.validate(body);

  if (error) {
    res.status(400).json({ message: JSON.stringify(error.details) });
    return;
  }
  next();
};

const deleteConfigValidator = (req, res, next) => {
  const { body } = req;
  const { error } = deleteConfigDBSchema.validate(body);
  if (error) {
    res.status(400).json({ message: JSON.stringify(error.details) });
    return;
  }
  next();
};
const updateConfigValidator = (req, res, next) => {
  const { body } = req;
  const { error } = updateConfigDBSchema.validate(body);

  if (error) {
    res.status(400).json({ message: JSON.stringify(error.details) });
    return;
  }
  next();
};

const payloadValidator = (req, res, next) => {
  const { body } = req;
  const { payload } = body;
  let error;
  if (body.type === 'API') {
    error = apiSchema.validate(payload).error;
  } else if (body.type === 'MAPPER') {
    error = mapperSchema.validate(payload).error;
  }
  if (error) {
    res.status(400).json({ message: JSON.stringify(error.details) });
    return;
  }
  next();
};

module.exports = {
  storeConfigValidator, payloadValidator, updateConfigValidator, deleteConfigValidator,
};
