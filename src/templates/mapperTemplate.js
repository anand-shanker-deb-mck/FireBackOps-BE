const camelCase = require('camelcase');

const returnMapperTemplate = (dependencies, code, refName, nodeModules) => {
  const nodeModulesRequire = nodeModules.map((nodeModule) => `const ${camelCase(nodeModule)} = require('${nodeModule}')\n`);
  const capitaliseRefName = refName.charAt(0).toUpperCase() + refName.slice(1, refName.length);
  const mapperCallHelper = `${nodeModulesRequire}\nconst make${capitaliseRefName}Call = (`;
  let mapperCallHelper2 = dependencies.join(', ');
  mapperCallHelper2 = mapperCallHelper + mapperCallHelper2;
  mapperCallHelper2 += ') =>  {\n';
  mapperCallHelper2 += (`${code}} \n\n`);
  return [mapperCallHelper2, `make${capitaliseRefName}Call`];
};

module.exports = { returnMapperTemplate };
