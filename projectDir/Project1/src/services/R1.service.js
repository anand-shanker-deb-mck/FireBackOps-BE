const { makeRandomUserLogCall } = require('./randomUserLog.service.js');
const utils = require('../utils/index.js');

const R1getService = async req => {
  const randomUser = await utils.makeAPICall(
    '`https://randomuser.me/api/`',
    'GET',
  );
  const randomUserLog = makeRandomUserLogCall([randomUser]);
  return randomUserLog;
};
module.exports = { R1getService };
