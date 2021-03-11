/* eslint-disable consistent-return */
const {
  createRouteSchema,
  updateRouteBodySchema,
  updateRouteParamsSchema,
} = require('./route.validation.schema');

const createRouteValidator = (req, res, next) => {
  const { body } = req;
  const validate = createRouteSchema.validate(body);
  if (validate.error) {
    return res.status(400).json({ message: 'Invalid body' });
  }
  next();
};

const updateRouteValidator = (req, res, next) => {
  const { body } = req;
  let validate = updateRouteBodySchema.validate(body);
  if (validate.error) {
    return res.status(400).json({ message: 'Invalid body' });
  }
  validate = updateRouteParamsSchema.validate(req.params);
  if (validate.error) {
    return res.status(400).json({ message: 'Invalid id' });
  }
  next();
};

module.exports = {
  createRouteValidator,
  updateRouteValidator,
};
