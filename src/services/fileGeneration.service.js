const fileUtils = require('../fileUtils/fileUtils');

const generateFiles = async (data) => {
  const directoryName = data.projectName;
  const functionName = data.funcName;

  // generate directory
  await fileUtils.makeDirectory(`${directoryName}`);

  // logic to write index.js
  const components = data.componentInput.map((item) => {
    if (!item.code) {
      return `const ${item.refName} = await make${item.type}call('${item.endpoint}');`;
    }
    return `const ${item.refName} = ${item.code.slice(7)};
        return ${item.refName};`;
  }).reduce((acc, curr) => `${`${acc} ${curr}`}\n`, '');

  const indexData = `const { makeAPIcall } = require('./helpers');
     async function ${functionName}() {
        ${components}
     }`;

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
