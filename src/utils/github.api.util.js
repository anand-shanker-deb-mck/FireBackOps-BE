const axios = require('axios').default;

const getToken = async (body, opts) => {
  const token = await axios.post('https://github.com/login/oauth/access_token', body, opts)
    .then((res) => res.data.access_token)
    .catch((error) => { throw error; });
  return token;
};

const getUserName = async (token) => {
  const username = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `token ${token}`,
    },
  }).then((response) => response.data.login)
    .catch((error) => { throw error; });
  return username;
};

module.exports = {
  getToken, getUserName,
};
