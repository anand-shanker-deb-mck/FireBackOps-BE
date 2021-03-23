const joi = require('joi');

const githubPushSchema = joi.object().keys({
  username: joi.string(),
  commitMessage: joi.string().required(),
  repositoryName: joi.string().required(),
  branchName: joi.string().required(),
});

module.exports = {
  githubPushSchema,
};
