const joi = require('joi');

const createUserProjectSchema = joi.object().keys({
  userName: joi.string().required(),
  ProjectId: joi.number().required(),
});

module.exports = { createUserProjectSchema };
