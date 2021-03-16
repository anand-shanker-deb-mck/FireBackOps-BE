const { User } = require('../../models');

const createUser = async (userName) => {
  const createdUser = await User.findOrCreate({
    where: { userName },
  });
  return createdUser;
};

module.exports = { createUser };
