const jwt = require('jsonwebtoken');
const fileUtil = require('../utils/file.util');
const githubApiUtil = require('../utils/github.api.util');

const oauthLogin = async (code) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const body = {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code,
    };
    const opts = { headers: { accept: 'application/json' } };
    const accessToken = await githubApiUtil.getToken(body, opts);
    const username = await githubApiUtil.getUserName(accessToken);
    fileUtil.writeFile('accessToken.txt', `${username} ${accessToken}`);
    const jwtToken = jwt.sign({ username },
      process.env.JWT_SECRET);
    fileUtil.writeFile('JWTToken.txt', `${username} ${jwtToken}`);
    return jwtToken;
  } catch (error) {
    throw error;
  }
};

module.exports = { oauthLogin };
