/* eslint-disable camelcase */
const { User } = require('../../models');

const getUserDetails = async () => {
  const userDetails = await User.findAll({
    attributes: ['user_name', 'display_name'],
  });
  return userDetails;
};

const getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

const getUserById = async (id) => {
  const requiredUser = await User.findAll({
    where: {
      userName: id,
    },
  });

  return requiredUser;
};
const createUser = async (userName, displayName) => {
  const newUser = await User.create({ userName, displayName });
  return newUser.dataValues;
};

module.exports = {
  getAllUsers, getUserById, createUser, getUserDetails,
};
