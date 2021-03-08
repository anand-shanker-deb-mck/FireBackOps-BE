const fileService = require('../services/newProject.service');

const createProject = async (req, res) => {
  const done = await fileService.addProjectName(req.body);
  res.status(201).send(done);
};

module.exports = { createProject };
