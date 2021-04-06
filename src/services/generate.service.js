const fs = require('fs');
const fsUtil = require('../utils/file.util');
const createFolderService = require('../service/createFolders.service');
const { indexContent } = require('../templates/index.template');
const generateCode = require('../service/index');

const generateCodeService = async (projectId, path) => {
  const result = await createFolderService.getRouteDetailsService(projectId);
  const routesName = result.routes.map((route) => route.name);
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
  const projectPath = `${path}/${result.projectName}`;
  try {
    await generateCode
      .updateHandlerAndDependency(routesName, result.projectName, result, projectPath);
  } catch (error) {
    console.log(error);
  }
  await fsUtil.writeFile(`${projectPath}/src/index.js`, indexContent());
};

module.exports = { generateCodeService };
