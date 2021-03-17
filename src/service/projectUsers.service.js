/* eslint-disable camelcase */
const { User_Project, User, Project } = require('../../models');

const getUserNamesService = (async (projectId) => {
  const projectDetail = await Project.findOne({
    where: {
      id: projectId,
    },
  });
  if (!projectDetail) { throw new Error('Project not found'); }
  const userDetails = await User_Project.findAll({
    include: [{
      model: User,
      attributes: ['userName'],
    }],
    where: {
      ProjectId: projectId,
    },
    attributes: [],

  });
  return userDetails;
});

module.exports = { getUserNamesService };
