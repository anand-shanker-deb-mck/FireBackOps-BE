const fetch = require('node-fetch');

const makeAPIcall = async (endpoint, method = 'GET') => {
  const response = await fetch(endpoint).then((res) => res.json());
  return response;
};
module.exports = {
  makeAPIcall,
};
