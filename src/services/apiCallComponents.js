/* eslint-disable quote-props */
const fetch = require('node-fetch');

const createOptions = (method, headers, body, authType = null, authToken = null) => {
  if (method === 'GET' || method === 'PUT' || method === 'DELETE') {
    const options = {
      method,
      headers: { ...headers, 'Authorization': `${authType} ${authToken}` },
      body,
    };
    return options;
  }

  if (method === 'POST') {
    const options = {
      method,
      headers: { 'Authorization': `${authType} ${authToken}` },
      body: JSON.stringify(body),
    };
    return options;
  }
};

const makeAPIcall = async (endpoint, method = 'GET', headers = null, body = null, auth_type = null, auth_token = null) => {
  const options = createOptions(method, headers, body, auth_type, auth_token);
  console.log(options);
  const response = await fetch(endpoint, options)
    .then((res) => res.json())
    .then(console.log)
    .catch((error) => error.message);
  return response;
};

module.exports = {
  makeAPIcall,
};
