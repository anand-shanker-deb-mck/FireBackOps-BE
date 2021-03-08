const fs = require('fs');

const appendUtil = (fileName, data) => new Promise((resolve, reject) => {
  fs.appendFile(fileName, data, (err) => {
    if (err) reject(err);
    resolve('Added project successfully');
  });
});

module.exports = { appendUtil };
