const joi = require('joi');

const projectUsersSchema = joi.object().keys(
  {
    id: joi.number().required(),
  },
);

module.exports = { projectUsersSchema };
