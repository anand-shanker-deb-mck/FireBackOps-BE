const joi = require('joi');

const postBodySchema = joi.object().keys({
  name: joi.string().required(),
});

module.exports = { postBodySchema };
