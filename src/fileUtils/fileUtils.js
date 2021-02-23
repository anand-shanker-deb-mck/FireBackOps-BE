const fs = require('fs');

const makeDirectory = (directoryName) => new Promise((resolve, reject) => {
  fs.mkdir(directoryName, { recursive: true }, (err) => {
    if (err) {
      reject(err);
    }
    resolve();
  });
});

const writeToAfile = (filePath, data) => new Promise((resolve, reject) => {
  fs.writeFile(filePath, data, 'utf-8', (err) => {
    if (err) {
      reject(err);
    }
    resolve(data);
  });
});

module.exports = {
  writeToAfile,
  makeDirectory,
};
