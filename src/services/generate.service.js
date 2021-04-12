const fs = require('fs');
const { eslintFix } = require('../utils/jsFormatter');
const fsUtil = require('../utils/file.util');
const createFolderService = require('../service/createFolders.service');
const { indexContent } = require('../templates/index.template');
const generateCode = require('../service/index');

const generateCodeService = async (projectId) => {
  try {
    const result = await createFolderService.getRouteDetailsService(projectId);
    const routesName = result.routes.map((route) => route.name);
    if (!fs.existsSync(process.env.PROJECT_PATH)) {
      fs.mkdirSync(process.env.PROJECT_PATH);
    }
    const projectPath = `${process.env.PROJECT_PATH}/${result.projectName}`;
    await generateCode.updateHandlerAndDependency(routesName,
      result.projectName,
      result,
      projectPath);
    await fsUtil.writeFile(`${projectPath}/src/index.js`, indexContent(routesName));
    eslintFix(projectPath);
  } catch (error) {
    console.log('error', error);
  }
};

module.exports = { generateCodeService };
