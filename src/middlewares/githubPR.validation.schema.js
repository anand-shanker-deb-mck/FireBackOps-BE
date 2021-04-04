const joi = require('joi');

const githubPRSchema = joi.object().keys({
  username: joi.string(),
  prTitle: joi.string().required(),
  prBody: joi.string(),
  repositoryName: joi.string().required(),
  branchName: joi.string().required(),
});

module.exports = {
  githubPRSchema,
};
