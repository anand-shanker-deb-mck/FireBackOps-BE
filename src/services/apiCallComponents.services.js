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
  // console.log(options);
  const response = await fetch(endpoint, options)
    .then((res) => res.json())
    .then(console.log)
    .catch((error) => error.message);
  return response;
};
// GET
// makeAPIcall('https://trackapi.nutritionix.com/v2/search/item?nix_item_id=5e8c25506a0485d04911b4eb', 'GET',
//   { 'x-app-id': 'fc2dc68b', 'x-app-key': '655b6f137722571fb6a530c658656595' });

// post
// const body = {
//   name: 'Hello-World_5',
// };

// makeAPIcall('https://api.github.com/user/repos', 'POST', null, body, 'Bearer', 'c9e9ba693c07dc2ce0a3b8c256c359bc732fb631');

// PUT/repos/{owner}/{repo}/collaborators/{username}//HemantTiwariGitHub
// makeAPIcall('https://api.github.com/repos/pushyatiwari/Hello-World_5/collaborators/HemantTiwariGitHub', 'PUT', null, null, 'Bearer', 'c9e9ba693c07dc2ce0a3b8c256c359bc732fb631');

// DELETE /repos/{owner}/{repo}/comments/{comment_id} // 36076546
makeAPIcall('https://api.github.com/repos/pushyatiwari/Hello-World_3/comments/{comment_id}', 'DELETE', null, null, 'Bearer', 'c9e9ba693c07dc2ce0a3b8c256c359bc732fb631');

module.exports = {
  makeAPIcall,
};
