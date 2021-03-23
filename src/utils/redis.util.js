const { redisClient } = require('../redis');

const getAccessToken = (username) => new Promise((resolve, reject) => {
  redisClient.get(username, (error, value) => {
    if (error) reject(error);
    resolve(value);
  });
});
module.exports = {
  getAccessToken,
};
