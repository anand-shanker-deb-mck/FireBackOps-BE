const fse = require('fs-extra');
const { prettifyJsText } = require('../../utils/jsFormatter');
const apiTemplate = require('../../templates/apiTemplate');
const mapperTemplate = require('../../templates/mapperTemplate');

const generateMapperCode = (mapper) => {
  const [mapperContent, mapperModuleExport] = mapperTemplate
    .returnMapperTemplate(mapper.dependencies, mapper.code, mapper.referenceName);
  return [mapperContent, mapperModuleExport];
};
const generateCommonFunction = async (projectName) => {
  try {
    let isApiComponentExist = false;
    const userProject = await fse.readJson('input.json');
    const routeList = userProject.routes;
    const routeListIterate = routeList.map(async (route) => {
      const mapperArguments = [];
      const configurationList = route.configuration;
      const componentType = configurationList.reduce(
        (accumulator, component) => {
          mapperArguments.push({
            type: component.type,
            dependencies: component.dependencies,
            code: component.payload.code,
            referenceName: component.refName,
            implementation: component.payload.implementation,
            routeName: route.routeName,
            nodeModules: component.payload.nodeModules,
          });
          return accumulator.add(component.type);
        }, new Set(),
      );
      if (componentType.has('API')) {
        isApiComponentExist = true;
      }
      const writeMapperCode = mapperArguments.map(async (mapper) => {
        if (mapper.type === 'MAPPER') {
          const [mapperContent, mapperModuleExport] = generateMapperCode(mapper);
          const finalMapperContent = `${mapperContent}\n\nmodule.exports = { ${mapperModuleExport}, }`;
          await fse.appendFile(`${projectName}/src/services/${mapper.referenceName}.service.js`, prettifyJsText(`${finalMapperContent}`));
        }
      });
      await Promise.all(writeMapperCode);

      const customMapperContent = mapperArguments.map(async (customMapper) => {
        if (customMapper.type !== 'MAPPER' && customMapper.type !== 'API') {
          await fse.appendFile(`${projectName}/src/services/${customMapper.referenceName}.service.js`, prettifyJsText(`${customMapper.implementation}`));
        }
      });

      await Promise.all(customMapperContent);
    });

    await Promise.all(routeListIterate);

    if (isApiComponentExist) {
      const apiFileContent = apiTemplate.returnApiTemplate();
      await fse.appendFile(`${projectName}/src/utils/index.js`, apiFileContent);
    }
    return userProject;
  } catch (error) {
    return error.message;
  }
};

module.exports = { generateCommonFunction };
