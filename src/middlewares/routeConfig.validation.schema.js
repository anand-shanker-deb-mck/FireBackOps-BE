const joi = require('joi');

const routeConfigSchema = joi.object().keys(
  {
    id: joi.number().required(),
  },
);

module.exports = { routeConfigSchema };
