const fs = require('fs');

const writeFile = (path, data) => new Promise((resolve, reject) => {
  fs.writeFile(path, data, (err) => {
    if (err) reject(err);
    resolve('finish');
  });
});

const readFile = (path) => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf-8', (err, data) => {
    if (err) reject(err);
    resolve(data);
  });
});

module.exports = {
  writeFile, readFile,
};
