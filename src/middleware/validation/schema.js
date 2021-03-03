const Joi = require('joi');

const APICOMPONENT = 'API';
const MAPPERCOMPONENT = 'MAPPER';

const storeConfigDBSchema = Joi.object().keys({
  type: Joi.string().valid(APICOMPONENT, MAPPERCOMPONENT).required(),
  payload: Joi.object().required(),
});

const apiSchema = Joi.object().keys({
  method: Joi.string().valid('GET', 'POST', 'PUT', 'DELETE').required(),
});

module.exports = { storeConfigDBSchema, apiSchema };
