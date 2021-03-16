/* eslint-disable camelcase */
const { User, User_Project } = require('../../models');

const createUserProject = async (ProjectId, userName) => {
  let UserId = await User.findAll({
    attributes: ['id'],
    where: {
      userName,
    },
  });
  UserId = UserId[0].dataValues.id;
  let user_project = await User_Project.findAll({
    where: {
      UserId,
      ProjectId,
    },
  });
  if (user_project.length !== 0) { throw Error; }
  user_project = await User_Project.create({ ProjectId, UserId });
  return user_project;
};

module.exports = { createUserProject };
