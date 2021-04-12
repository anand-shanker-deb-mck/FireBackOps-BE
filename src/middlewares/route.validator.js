/* eslint-disable consistent-return */
const {
  createRouteSchema,
  updateRouteBodySchema,
  updateRouteParamsSchema,
  getRoutesByProjectSchema,
  getRouteDetailsSchema,
} = require('./route.validation.schema');

const getRouteDetailsValidator = (req, res, next) => {
  const { params } = req;
  const { error } = getRouteDetailsSchema.validate(params);
  if (error) {
    return res.status(400).send({ message: JSON.stringify(error.details) });
  }
  next();
};
const createRouteValidator = (req, res, next) => {
  const { body } = req;
  const { error } = createRouteSchema.validate(body);
  if (error) {
    return res.status(400).send({ message: JSON.stringify(error.details) });
  }
  next();
};

const getRoutesByProjectIDValidator = (req, res, next) => {
  const { params } = req;
  const { error } = getRoutesByProjectSchema.validate(params);
  if (error) {
    return res.status(400).send({ message: JSON.stringify(error.details) });
  }
  next();
};

const updateRouteValidator = (req, res, next) => {
  const { body } = req;
  const { error } = updateRouteBodySchema.validate(body);
  if (error) {
    return res.status(400).send({ message: JSON.stringify(error.details) });
  }
  const validate = updateRouteParamsSchema.validate(req.params);
  if (validate.error) {
    return res.status(400).send({ message: JSON.stringify(validate.error.details) });
  }
  next();
};

module.exports = {
  createRouteValidator,
  getRoutesByProjectIDValidator,
  updateRouteValidator,
  getRouteDetailsValidator,
};
