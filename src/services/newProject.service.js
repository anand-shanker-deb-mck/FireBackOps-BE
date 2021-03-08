const fileUtils = require('../utils/fileUtils');

const addProjectName = async (content) => {
  const newProject = `${content.name}\n`;
  const acknowledgement = await fileUtils.appendUtil('resources/projectNames.txt', newProject);
  return acknowledgement;
};

module.exports = { addProjectName };
