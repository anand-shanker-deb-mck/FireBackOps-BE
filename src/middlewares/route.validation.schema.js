const joi = require('joi');

const createRouteSchema = joi.object().keys({
  p_id: joi.number().required(),
  r_config: joi.object().required(),
  name: joi.string().required(),
  method: joi.string().required(),
});

const getRoutesByProjectSchema = joi.object().keys({
  pid: joi.number().required(),
});

const updateRouteBodySchema = joi.object().keys({
  p_id: joi.number().required(),
  r_config: joi.object().required(),
  name: joi.string().required(),
});
const updateRouteParamsSchema = joi.object().keys({
  id: joi.number().required(),
});

const getRouteDetailsSchema = joi.object().keys({
  id: joi.number().required(),
});

module.exports = {
  createRouteSchema,
  updateRouteBodySchema,
  updateRouteParamsSchema,
  getRoutesByProjectSchema,
  getRouteDetailsSchema,
};
