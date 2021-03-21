/* eslint-disable no-return-await */
/* eslint-disable camelcase */
const { User_Project } = require('../../models');

const createUserProject = async (ProjectId, UserId) => {
  const isUserPresent = await User_Project.findOne({
    where: {
      UserId,
      ProjectId,
    },
  });

  if (isUserPresent) { throw Error; }
  return await User_Project.create({ ProjectId, UserId });
};

module.exports = { createUserProject };
