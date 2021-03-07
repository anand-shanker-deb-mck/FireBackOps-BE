/* eslint-disable no-unused-vars */
const createFoldersService = require('../service/createFolders.service');

const createFoldersHandler = async (req, res) => {
  try {
    const { body } = req;
    const { projectId } = body;
    const routesList = await createFoldersService.getRouteNamesService(projectId);
    const projectName = await createFoldersService.getProjectName(projectId);
    const routeNames = routesList.map((routeName) => routeName.name);
    res.status(200).send(routeNames);
  } catch (err) {
    res.send(400).send('Unable to fetch');
  }
};

module.exports = { createFoldersHandler };
