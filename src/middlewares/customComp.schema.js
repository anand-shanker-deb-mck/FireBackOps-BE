const Joi = require('joi');

const customCompSchema = Joi.object().keys({
  configId: Joi.number().required(),
  type: Joi.string().required(),
});

module.exports = { customCompSchema };
