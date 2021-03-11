const jwt = require('jsonwebtoken');
const fileUtil = require('../utils/file.util');
const githubApiUtil = require('../utils/github.api.util');

const oauthLogin = async (code) => {
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
    process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY_TIME });
  return jwtToken;
};

module.exports = { oauthLogin };
