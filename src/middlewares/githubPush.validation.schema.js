const joi = require('joi');

const githubPushSchema = joi.object().keys({
  userName: joi.string().required(),
  authToken: joi.string().required(),
  commitMessage: joi.string().required(),
  repositoryName: joi.string().required(),
  branchName: joi.string().required(),
});

module.exports = {
  githubPushSchema,
};