const isUrl = require('is-url');
const Joi = require('joi');

const { API_COMPONENT, MAPPER_COMPONENT } = require('../../constants/constants');
const { METHODS } = require('../../constants/constants');

const storeConfigDBSchema = Joi.object().keys({
  type: Joi.string().valid(API_COMPONENT, MAPPER_COMPONENT).required(),
  routeId: Joi.number().required(),
  sequence: Joi.number().required(),
  refName: Joi.string().trim().required(),
  payload: Joi.object().required(),
  dependencies: Joi.array().items(Joi.number()),
});
const deleteConfigDBSchema = Joi.object().keys({
  routeId: Joi.number().required(),
  sequence: Joi.number().required(),
});
const updateConfigDBSchema = Joi.object().keys({
  id: Joi.number().required(),
  type: Joi.string().valid(API_COMPONENT, MAPPER_COMPONENT),
  routeId: Joi.number(),
  sequence: Joi.number(),
  refName: Joi.string().trim(),
  payload: Joi.object(),
  dependencies: Joi.array().items(Joi.number()),
});

const apiSchema = Joi.object().keys({
  method: Joi.string().valid(...METHODS).required(),
  url: Joi.string().custom((urlValue, error) => {
    if (!isUrl(urlValue)) {
      return error.message('URL must be valid');
    }
    return true;
  }).required(),
  baseUrl: Joi.string().custom((urlValue, error) => {
    if (!isUrl(urlValue)) {
      return error.message('URL must be valid');
    }
    return true;
  }).required(),
  headers: Joi.object(),
  // body is valid only for POST and PUT methods
  body: Joi.object().when('method', { is: 'POST', then: Joi.required() })
    .concat(Joi.object().when('method', { is: 'PUT', then: Joi.required() }))
    .concat(Joi.object().when('method', { is: 'GET', then: Joi.forbidden() }))
    .concat(Joi.object().when('method', { is: 'DELETE', then: Joi.forbidden() })),
});

const mapperSchema = Joi.object().keys({
  code: Joi.string().required(),
  nodeModules: Joi.array().items(Joi.string()),
});

module.exports = {
  storeConfigDBSchema, apiSchema, mapperSchema, updateConfigDBSchema, deleteConfigDBSchema,
};
