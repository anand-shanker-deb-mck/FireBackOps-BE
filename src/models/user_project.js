/* eslint-disable camelcase */
const {
  Model, DataTypes,
} = require('sequelize');

module.exports = (sequelize) => {
  class User_Project extends Model {
  }
  User_Project.init({
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
    ProjectId: { type: DataTypes.STRING, field: 'project_id' },
    UserId: { type: DataTypes.INTEGER, field: 'user_id' },

  }, {
    sequelize,
    modelName: 'User_Project',
    tableName: 'user_projects',
  });
  return User_Project;
};
