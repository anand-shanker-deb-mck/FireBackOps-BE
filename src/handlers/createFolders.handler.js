const createFoldersService = require('../service/createFolders.service');

const createFoldersHandler = async (req, res) => {
  try {
    const { body } = req;
    const { projectId } = body;
    const routesIdList = await createFoldersService.getRouteDetailsService(projectId);
    res.status(200).json({ data: routesIdList });
  } catch (err) {
    res.status(500).json({ message: 'Unable to fetch details' });
  }
};

module.exports = { createFoldersHandler };
