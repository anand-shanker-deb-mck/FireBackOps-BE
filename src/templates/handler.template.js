/* eslint-disable camelcase */
const createRouteService = (method, name) => `const {
  ${method}${name}Service,
} = require('../service/${name}.service');\n\n`;

const createTryTempPart1 = (
  method,
  name,
) => `const ${method}${name}Handler = async (req, res) => {
  try {`;

const createTryTempPart2 = (method, name, r_config) => {
  let keys = Object.keys(r_config);
  keys = keys.map((key) => key.toLowerCase());
  keys.sort();
  let destructReq = keys.reduce((acc, curVal) => `${acc}${curVal}, `, '');
  destructReq = destructReq.substring(0, destructReq.length - 2);
  const handleReqString = `\n    const { ${destructReq} } = req;`;
  const callRouteService = `\n    const result = await ${method}${name}Service(${destructReq});\n    res.status(200).json({ message: result });\n`;
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
createTryTempPart2('method', 'routeName', {
  body: {
    args: 'project1',
  },
  Params: {
    routeId: '1',
  },
});

module.exports = {
  createRouteService,
  createTryTempPart1,
  createTryTempPart2,
  createCatchTemp,
  exportHandler,
};
