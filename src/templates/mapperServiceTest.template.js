const returnMapperServiceTestTemplate = (refName, serviceFilePath) => {
  const capitaliseRefName = refName.charAt(0).toUpperCase() + refName.slice(1, refName.length);
  const service = `make${capitaliseRefName}Call`;
  const serviceDescribe = `describe('${service}',()=>{
          it('should pass the test',()=>{
              //TODO
          })
      })`;
  return `const {${service}} = require('${serviceFilePath}')\n${serviceDescribe}`;
};

module.exports = { returnMapperServiceTestTemplate };
