const joi = require('joi');

const getAllProjectsSchema = joi.object().keys({
  id: joi.number().required(),

});
const getProjectByIdSchema = joi.object().keys({

  id: joi.number().required(),
});
const createProjectSchema = joi.object().keys({

  name: joi.string().required(),
  pAttributes: joi.object().required(),
});

const updateProjectSchema = joi.object().keys({
  name: joi.string().required(),
  pAttributes: joi.object().required(),

});
const deleteProjectSchema = joi.object().keys({
  id: joi.number().required(),
});

module.exports = {
  deleteProjectSchema,
  updateProjectSchema,
  createProjectSchema,
  getAllProjectsSchema,
  getProjectByIdSchema,
};
