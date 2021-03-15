const joi = require('joi');

const createUserSchema = joi.object().keys({
  userName: joi.string().required(),
  displayName: joi.string().required(),
});
const getUserSchema = joi.object().keys({

  id: joi.string().required(),
});

module.exports = {
  createUserSchema,
  getUserSchema,
};
