const returnServiceTestTemplate = (services, serviceFilePath, hasApiComponent) => {
  const serviceCalls = services.join(',');
  let apiMock = '';
  if (hasApiComponent) {
    apiMock = 'const {makeApiCall} = require(\'../../utils/index.js\')\njest.mock(\'../../utils/index.js\')';
  }
  const serviceDescribes = services.map((service) => `describe('${service}',()=>{
        it('should pass the test',()=>{
            //TODO
        })
    })`);
  const serviceDescribesString = serviceDescribes.join('\n');
  return `const {${serviceCalls}} = require('${serviceFilePath}')\n${apiMock}\n${serviceDescribesString}`;
};

module.exports = { returnServiceTestTemplate };
