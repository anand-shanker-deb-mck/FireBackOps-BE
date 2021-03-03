const isUrl = require('is-url');
const Joi = require('joi');

const APICOMPONENT = 'API';
const MAPPERCOMPONENT = 'MAPPER';

const storeConfigDBSchema = Joi.object().keys({
  type: Joi.string().valid(APICOMPONENT, MAPPERCOMPONENT).required(),
  payload: Joi.object().required(),
});

const apiSchema = Joi.object().keys({
  method: Joi.string().valid('GET', 'POST', 'PUT', 'DELETE').required(),
  url: Joi.string().custom((urlValue, helper) => {
    if (!isUrl(urlValue)) {
      return helper.message('URL must be valid');
    }
    return true;
  }),
  headers: Joi.object(),
  // body is valid only for POST and PUT methods
  body: Joi.object().when('method', { is: 'POST', then: Joi.required() })
    .concat(Joi.object().when('method', { is: 'PUT', then: Joi.required() }))
    .concat(Joi.object().when('method', { is: 'GET', then: Joi.forbidden() }))
    .concat(Joi.object().when('method', { is: 'DELETE', then: Joi.forbidden() })),
});

module.exports = { storeConfigDBSchema, apiSchema };
