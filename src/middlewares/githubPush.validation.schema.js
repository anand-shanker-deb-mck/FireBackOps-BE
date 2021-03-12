const joi = require('joi');

const githubPushSchema = joi.object().keys({
  accessToken: joi.string().required(),
  commitMessage: joi.string().required(),
  repositoryName: joi.string().required(),
  branchName: joi.string().required(),
});

module.exports = {
  githubPushSchema,
};
