const isUrl = require('is-url');
const Joi = require('joi');

const { API_COMPONENT } = require('../../constants/constants');
const { MAPPER_COMPONENT } = require('../../constants/constants');
const { METHODS } = require('../../constants/constants');

const storeConfigDBSchema = Joi.object().keys({
  id: Joi.number(),
  type: Joi.string().valid(API_COMPONENT, MAPPER_COMPONENT).required(),
  routeId: Joi.number().required(),
  sequence: Joi.number().required(),
  refName: Joi.string().required(),
  payload: Joi.object().required(),
});

const apiSchema = Joi.object().keys({
  method: Joi.string().valid(...METHODS).required(),
  url: Joi.string().custom((urlValue, error) => {
    if (!isUrl(urlValue)) {
      return error.message('URL must be valid');
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

const mapperSchema = Joi.object().keys({
  code: Joi.string().required(),
  dependency: Joi.array(),
});

module.exports = { storeConfigDBSchema, apiSchema, mapperSchema };
