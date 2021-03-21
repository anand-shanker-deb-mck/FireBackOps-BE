const { routeConfigSchema } = require('./routeConfig.validation.schema');

// eslint-disable-next-line consistent-return
const routeConfigValidator = (req, res, next) => {
  const { params } = req;
  const validate = routeConfigSchema.validate(params);
  if (validate.error) {
    return res.status(400).send('Bad Request');
  }
  next();
};

module.exports = {
  routeConfigValidator,
};
