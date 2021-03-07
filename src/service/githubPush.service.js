const fileUtils = require('../utils/file.utils');

const getFoldersService = async () => {
  const folders = await fileUtils.readFile('./src/resources/folders.txt');
  return folders.split(',');
};

module.exports = { getFoldersService };
