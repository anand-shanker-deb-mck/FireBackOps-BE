const fileUtils = require('../fileUtils/fileUtils');

const generateFiles = async (data) => {
  const directoryName = data.projectName;
  const functionName = data.funcName;

  // generate directory
  await fileUtils.makeDirectory(`${directoryName}`);

  const indexData = 'test';
  const helpersData = 'test';
  const packageJSONdata = 'test';
  // files creating and writing
  await fileUtils.writeToAfile(`./${directoryName}/index.js`, `${indexData}`);
  await fileUtils.writeToAfile(`./${directoryName}/helpers.js`, `${helpersData}`);
  await fileUtils.writeToAfile(`./${directoryName}/package.json`, `${packageJSONdata}`);
};

module.exports = {
  generateFiles,
};
