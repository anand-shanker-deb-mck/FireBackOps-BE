const fse = require('fs-extra');
const lodash = require('lodash');
const fs = require('../utils/fileSystem');

const updateHandler = async (projectName, routeName, dummyDataFile) => {
  let componentList = await fse.readJson(dummyDataFile);
  componentList = lodash.sortBy(componentList, (o) => o.sequenceNumber);
  const code = componentList
    .filter((component) => component.routeName === routeName)
    .reduce((functionCalls, component) => {
      if (component.type === 'API') {
        return `${functionCalls}const ${component.refName} = utils.make${lodash.capitalize(component.type)}Call('${component.payload.endpoint}', '${component.payload.method}');\n`;
      } if (component.type === 'MAPPER') {
        return `${functionCalls}const ${component.refName} = utils.make${lodash.capitalize(component.type)}Call([${component.payload.dependencies}], '${component.payload.code}');\n`;
      }
      return '';
    }, '');
  const handlerData = `const utils = require("../utils/index.js");\nconst handler = (req,res) => {${code}};\nmodule.exports = handler;\n`;
  await fs.writeFile(`${projectName}/src/handlers/${routeName}.handler.js`, handlerData);
};

module.exports = { updateHandler };
