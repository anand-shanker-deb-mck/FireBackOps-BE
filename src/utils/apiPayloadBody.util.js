const makeBodyTemplateString = (body) => {
  const modifiedValues = Object.values(body).map((value) => {
    if (value.slice(0, 4) === 'req.') {
      return `\${${value}}`;
    }
    return value;
  });
  const modifiedKeys = Object.keys(body).map((key) => {
    if (key.slice(0, 4) === 'req.') {
      return `\${${key}}`;
    }
    return key;
  });
  const finalBody = modifiedKeys.reduce((acc, key, index) => {
    const accCopy = { ...acc };
    accCopy[key] = modifiedValues[index];
    return accCopy;
  }, {});
  let bodyString = '{\n';
  Object.keys(finalBody).forEach((key) => {
    if (key[0] === '$') {
      bodyString += `\`${key}\` : \`${finalBody[key]}\`,\n`;
    } else {
      bodyString += `${key}: \`${finalBody[key]}\`,\n`;
    }
  });
  bodyString += '}';
  return bodyString;
};

module.exports = {
  makeBodyTemplateString,
};
