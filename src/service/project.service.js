/* eslint-disable camelcase */

const dotenv = require('dotenv');

dotenv.config();
const { Project } = require('../../models');
const { User } = require('../../models');

const getAllProjects = async (id) => {
  const requiredProject = await User.findAll({
    include: [
      {
        model: Project, as: 'projects',
      },
    ],
    where: {
      id,
    },

  }).catch(console.log);

  return requiredProject;
};

const getProjectById = async (id) => {
  const requiredProject = await Project.findAll({
    include: [
      {
        model: User, as: 'users',
      },
    ],

    where: {
      id,
    },

  }).catch(console.log);
  return requiredProject;
};
const createProject = async (name, pAttributes) => {
  const newProject = await Project.create({ name, pAttributes });
  return newProject.dataValues;
};

const updateProject = async (name, pAttributes, id) => {
  const updatedProject = await Project.update({ name, pAttributes }, {
    where: {
      id,
    },
  });
  return updatedProject;
};

const deleteProjectById = async (id) => {
  const deletedProject = await Project.destroy({
    where: {
      id,
    },
    truncate: { cascade: true },
  });

  return deletedProject;
};

const deleteAllProjects = async () => {
  const deletedProject = await Project.destroy({ truncate: { cascade: true } });
  return deletedProject;
};
module.exports = {
  getAllProjects,
  getProjectById,

  createProject,
  deleteAllProjects,
  deleteProjectById,
  updateProject,
};
