const { routeConfigSchema } = require('./routeConfig.validation.schema');

const routeConfigValidator = (req, res, next) => {
  const { params } = req;
  const validate = routeConfigSchema.validate(params);
  if (validate.error) {
    return res.status(400).send('Bad Request');
  }
  return next();
};

module.exports = {
  routeConfigValidator,
};
