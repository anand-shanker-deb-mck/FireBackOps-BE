const returnHandlerTestTemplate = (handlers, handlerFilePath, services, serviceFilePath) => {
  const handlerCalls = handlers.join(',');
  const handlerDescribes = handlers.map((handler, index) => `describe('${handler}',()=>{
          it('should pass the test',()=>{
            const spyOn${services[index].charAt(0).toUpperCase() + services[index].slice(1, services[index].length)} = jest.spyOn(services,'${services[index]}')
              //TODO
          })
      })`);
  const handlerDescribesString = handlerDescribes.join('\n');
  return `const {${handlerCalls}} = require('${handlerFilePath}')\nconst services = require('${serviceFilePath}')\n\n${handlerDescribesString}`;
};

module.exports = { returnHandlerTestTemplate };
