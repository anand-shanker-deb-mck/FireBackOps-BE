/* eslint-disable camelcase */
const userServices = require('../service');

const getUserDetailsHandler = async (req, res) => {
  try {
    const allUsers = await userServices.getUserDetails();
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(500).send();
  }
};

const getAllUsersHandler = async (req, res) => {
  try {
    const allUsers = await userServices.getAllUsers();
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(500).send();
  }
};

const getUsersByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const requiredUser = await userServices.getUserById(id);
    res.status(200).send(requiredUser);
  } catch (error) { res.status(500).send(); }
};

const createUserHandler = async (req, res) => {
  try {
    const { userName } = req.body;
    const { displayName } = req.body;

    const newUser = await userServices.createUser(userName, displayName);

    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send();
  }
};
module.exports = {
  getAllUsersHandler, getUsersByIdHandler, createUserHandler, getUserDetailsHandler,
};
