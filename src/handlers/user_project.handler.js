const userProjectServices = require('../service');

const createUserProjectHandler = async (req, res) => {
  try {
    const { user } = req;
    const { ProjectId } = req.body;
    const { userAdded } = req.body;
    const newUser = await userProjectServices.createUserProject(ProjectId, userAdded.id);
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Duplicate entries not allowed!' });
  }
};

module.exports = { createUserProjectHandler };
