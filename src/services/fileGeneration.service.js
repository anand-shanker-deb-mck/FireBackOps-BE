/* eslint-disable no-useless-escape */
const fileUtils = require('../utils/fileUtils');

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

  // index data
  const indexData = `const { makeAPIcall } = require('./helpers');
     async function ${functionName}() {
        ${components}
     }`;

  // helpers.js data
  const methodType = data.componentInput[0].method;
  const helpersData = `const fetch = require('node-fetch');
    const makeAPIcall = async (endpoint, method = '${methodType}') => {
          const response = await fetch(endpoint).then((res) => res.json());
           return response;
         };
         module.exports = {
          makeAPIcall,
         };`;

  // package.json data
  const packageJSONdata = `{
    "name": "${directoryName}",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "test": "echo 'Error: no test specified' && exit 1"
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
        "node-fetch": "^2.6.1"
    }
}`;

  // files creating and writing
  await fileUtils.writeToAfile(`./${directoryName}/index.js`, `${indexData}`);
  await fileUtils.writeToAfile(`./${directoryName}/helpers.js`, `${helpersData}`);
  await fileUtils.writeToAfile(`./${directoryName}/package.json`, `${packageJSONdata}`);
};

module.exports = {
  generateFiles,
};
