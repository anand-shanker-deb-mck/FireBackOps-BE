/* eslint-disable camelcase */
const createRouteService = (method, name) => `const {
  ${method}${name}Service,
} = require('../service/${name}.service.js');\n\n`;

const createTryTempPart1 = (
  method,
  name,
) => `const ${method}${name}Handler = async (req, res) => {
  try {`;

const createTryTempPart2 = (method, name, r_config) => {
  let keys = Object.keys(r_config);
  keys = keys.map((key) => key.toLowerCase());
  keys.sort();
  const handleReqString = keys.reduce((acc, curVal) => `${acc}    const { ${curVal} } = req;\n`, '\n');
  const callRouteService = `\n    const result = await ${method}${name}Service(${keys});\n    res.status(200).json({ message: result });\n`;
  const handlerTryTemp = handleReqString + callRouteService;
  return handlerTryTemp;
};
const createCatchTemp = () => `  } catch (error) {
    res.status(500).json();
  }
};`;
const exportHandler = (method, name) => `
module.exports = {
  ${method}${name}Handler,
};\n`;

module.exports = {
  createRouteService,
  createTryTempPart1,
  createTryTempPart2,
  createCatchTemp,
  exportHandler,
};
