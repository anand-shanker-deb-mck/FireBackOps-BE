/* eslint-disable no-unused-vars */
const createFoldersService = require('../service/createFolders.service');

const createFoldersHandler = async (req, res) => {
  try {
    const inputJson = [];
    const { body } = req;
    const { projectId } = body;
    const routesIdList = await createFoldersService.getRouteDetailsService(projectId);
    const projectName = await createFoldersService.getProjectName(projectId);
    res.status(200).send(routesIdList);
  } catch (err) {
    res.status(500).send('Unable to fetch details');
  }
};

module.exports = { createFoldersHandler };
