/* eslint-disable no-unused-vars */
const { storeConfigDBSchema, apiSchema } = require('./schema');
const { payloadValidation } = require('./customValidation');

const storeConfigValidator = (req, res, next) => {
  const { body } = req;
  const { value, error } = storeConfigDBSchema.validate(body);
  //   const msg = payloadValidation(body);

  if (error) {
    res.status(400).send();
  }
  //   } else {
  //     res.status(200).send({ message: ' Valid data' });
  //   }
  next();
};

const payloadValidator = (req, res) => {
  const { body } = req;
  const { payload } = body;
  if (body.type === 'API') {
    console.log(payload);
    const { value, error } = apiSchema.validate(payload);

    if (error) {
      console.log('error');
      res.status(400).send();
    } else {
      console.log('success');
      res.status(200).send({ message: ' Valid payload' });
    }
    // next();
  }
};

module.exports = { storeConfigValidator, payloadValidator };
