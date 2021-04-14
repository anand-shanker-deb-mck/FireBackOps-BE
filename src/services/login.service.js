const jwt = require('jsonwebtoken');
const githubApiUtil = require('../utils/github.api.util');
const { redisClient } = require('../redis');
const userUtils = require('../utils/user.utils');

const oauthLogin = async (code) => {
  const body = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code,
  };

  const opts = { headers: { accept: 'application/json' } };
  const accessToken = await githubApiUtil.getToken(body, opts);
  const username = await githubApiUtil.getUserName(accessToken);
  const userObject = await userUtils.createUser(username);

  await redisClient.setex(username, process.env.ACCESS_TOKEN_EXPIRY_TIME, accessToken);

  const jwtToken = await jwt.sign({ username, id: userObject[0].dataValues.id },
    process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY_TIME });
  return { jwtToken, username };
};

module.exports = { oauthLogin };
