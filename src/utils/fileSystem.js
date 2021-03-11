const fs = require('fs');

const promisifyWriteFile = (filePath, data) => new Promise((resolve, reject) => {
  fs.writeFile(filePath, data, 'utf-8', (err) => {
    if (err) {
      reject(err);
    } else {
      resolve('Success');
    }
  });
});
module.exports = {
  writeFile: promisifyWriteFile,
};
