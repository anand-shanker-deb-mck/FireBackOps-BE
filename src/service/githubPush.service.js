const fileUtils = require('../utils/file.util');

const getFoldersService = async () => {
  const folders = await fileUtils.readFile('./src/resources/folders.txt');
  return folders.split(',');
};

module.exports = { getFoldersService };
