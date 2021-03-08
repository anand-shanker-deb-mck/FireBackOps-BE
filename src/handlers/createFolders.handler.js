/* eslint-disable no-unused-vars */
const createFoldersService = require('../service/createFolders.service');

const createFoldersHandler = async (req, res) => {
  try {
    const { body } = req;
    const { projectId } = body;
    const routesList = await createFoldersService.getRouteNamesService(projectId);
    const projectName = await createFoldersService.getProjectName(projectId);
    const routeNames = routesList.map((routeName) => routeName.name);
    // (Call to main function of creating folders using projectName and routeNames)
    res.status(200).send(routeNames);
  } catch (err) {
    res.status(500).send('Unable to fetch details');
  }
};

module.exports = { createFoldersHandler };
