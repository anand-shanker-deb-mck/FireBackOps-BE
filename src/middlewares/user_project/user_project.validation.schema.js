const joi = require('joi');

const createUserProjectSchema = joi.object().keys({
  ProjectId: joi.number().required(),
  userAdded: joi.object().required(),
});

module.exports = { createUserProjectSchema };
