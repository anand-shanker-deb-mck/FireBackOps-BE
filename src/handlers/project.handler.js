/* eslint-disable camelcase */
const projectServices = require('../service');

const getAllProjectsHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const allProjects = await projectServices.getAllProjects(id);

    res.status(200).send(allProjects);
  } catch (error) {
    res.status(500).send();
  }
};

const getProjectByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const requiredProject = await projectServices.getProjectById(id);
    res.status(200).send(requiredProject);
  } catch (error) {
    res.status(500).send();
  }
};
const createProjectHandler = async (req, res) => {
  const { name } = req.body;
  const { pAttributes } = req.body;
  try {
    const newProject = await projectServices.createProject(name, pAttributes);
    res.status(200).send(newProject);
  } catch (error) {
    // res.status(500).json({ message: 'Error ,  Cannot create project' });
    res.status(500).send();
  }
};

const updateProjectHandler = async (req, res) => {
  const { name } = req.body;
  const { pAttributes } = req.body;
  const { id } = req.params;
  try {
    const updatedProject = await projectServices.updateProject(name, pAttributes, id);
    res.status(200).send(updatedProject);
  } catch (error) {
    res.status(500).send();
  }
};

const deleteProjectByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProject = await projectServices.deleteProjectById(id);
    res.sendStatus(200).send(deletedProject);
  } catch (error) {
    res.status(500).send();
  }
};

const deleteProjectHandler = async (req, res) => {
  try {
    const deletedProject = await projectServices.deleteAllProjects();

    res.sendStatus(200).send(deletedProject);
  } catch (error) {
    res.status(500).send();
  }
};

module.exports = {
  getAllProjectsHandler,
  getProjectByIdHandler,
  createProjectHandler,
  deleteProjectHandler,
  deleteProjectByIdHandler,
  updateProjectHandler,
};
