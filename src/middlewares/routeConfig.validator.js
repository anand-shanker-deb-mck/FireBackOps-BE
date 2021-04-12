const { routeConfigSchema } = require('./routeConfig.validation.schema');

const routeConfigValidator = (req, res, next) => {
  const { params } = req;
  const { error } = routeConfigSchema.validate(params);
  if (error) {
    return res.status(400).send({ message: JSON.stringify(error.details) });
  }
  return next();
};

module.exports = {
  routeConfigValidator,
};
