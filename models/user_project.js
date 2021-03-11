/* eslint-disable camelcase */
const {
  Model, DataTypes,
} = require('sequelize');

module.exports = (sequelize) => {
  class User_Project extends Model {
    static associate({ Project, User }) {
      User_Project.belongsTo(Project, {
        foreignKey: 'ProjectId',
      });
      User_Project.belongsTo(User, {
        foreignKey: 'UserId',
      });
    }
  }
  User_Project.init({
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
    ProjectId: { type: DataTypes.INTEGER, field: 'project_id' },
    UserId: { type: DataTypes.INTEGER, field: 'user_id' },

  }, {
    sequelize,
    modelName: 'User_Project',
    tableName: 'user_projects',
  });
  return User_Project;
};
