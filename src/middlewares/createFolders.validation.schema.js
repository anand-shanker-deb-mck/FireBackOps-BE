const joi = require('joi');

const createFoldersSchema = joi.object().keys(
  {
    projectId: joi.number().required(),
  },
);

module.exports = { createFoldersSchema };
