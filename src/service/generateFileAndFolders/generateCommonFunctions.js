const fse = require('fs-extra');
const { prettifyJsText } = require('../../utils/javaScriptFormatter');
const apiTemplate = require('../../templates/apiTemplate');
const mapperTemplate = require('../../templates/mapperTemplate');

const generateCommonFunction = async (projectName) => {
  const moduleExports = [];
  const mapperArguments = [];
  try {
    const configurationList = await fse.readJson('input.json');
    const componentType = configurationList.reduce(
      (accumulator, component) => {
        mapperArguments.push({
          type: component.type,
          dependencies: component.dependencies,
          code: component.payload.code,
          referenceName: component.refName,
          routeName: component.routeName,
        });
        return accumulator.add(component.type);
      }, new Set(),
    );
    if (componentType.has('API')) {
      const apiFileContent = apiTemplate.returnApiTemplate();
      await fse.appendFile(`${projectName}/src/utils/index.js`, apiFileContent);
      moduleExports.push('makeAPIcall');
    }
    await fse.appendFile(`${projectName}/src/utils/index.js`, `\n module.exports = { ${moduleExports.join(' , ')} };`);
    const moduleExportsForMapper = {};
    const mapperFileContent = mapperArguments.map((mapper) => {
      if (mapper.type === 'MAPPER') {
        const [mapperContent, mapperModuleExport] = mapperTemplate
          .returnMapperTemplate(mapper.dependencies, mapper.code, mapper.referenceName);
        if (!moduleExportsForMapper[mapper.routeName]) {
          moduleExportsForMapper[mapper.routeName] = [mapperModuleExport];
        } else {
          moduleExportsForMapper[mapper.routeName].push(mapperModuleExport);
        }
        return fse.appendFile(`${projectName}/src/services/${mapper.routeName}.service.js`, prettifyJsText(`${mapperContent}`));
      }
      return -1;
    });
    await Promise.all(mapperFileContent);
    const mapperModuleExportsContent = Object.keys(moduleExportsForMapper)
      .map((moduleExportForRouteName) => fse.appendFile(`${projectName}/src/services/${moduleExportForRouteName}.service.js`,
        prettifyJsText(`\n\nmodule.exports = { ${moduleExportsForMapper[moduleExportForRouteName].join(', ')}, }`)));

    return await Promise.all(mapperModuleExportsContent);
  } catch (error) {
    return error.message;
  }
};

module.exports = { generateCommonFunction };
