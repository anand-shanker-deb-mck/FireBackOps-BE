const userProjectServices = require('../service');

const createUserProjectHandler = async (req, res) => {
  try {
    const { userName } = req.body;
    const { ProjectId } = req.body;
    const newUser = await userProjectServices.createUserProject(ProjectId, userName);
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Duplicate entries not allowed!' });
  }
};

module.exports = { createUserProjectHandler };
