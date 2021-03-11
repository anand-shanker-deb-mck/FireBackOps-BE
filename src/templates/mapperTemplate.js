const returnMapperTemplate = (dependencies, code, refName) => {
  const capitaliseRefName = refName.charAt(0).toUpperCase() + refName.slice(1, refName.length);
  const mapperCallHelper = `\nconst make${capitaliseRefName}Call = (`;
  let mapperCallHelper2 = dependencies.join(', ');
  mapperCallHelper2 = mapperCallHelper + mapperCallHelper2;
  mapperCallHelper2 += ') =>  {\n';
  mapperCallHelper2 += (`${code}} \n\n`);
  return [mapperCallHelper2, `make${capitaliseRefName}Call`];
};

module.exports = { returnMapperTemplate };
