const joi = require('joi');

const createUserProjectSchema = joi.object().keys({
  ProjectId: joi.number().required(),
});

module.exports = { createUserProjectSchema };
