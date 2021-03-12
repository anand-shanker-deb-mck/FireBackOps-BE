const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Project }) {
      User.belongsToMany(Project, {
        through: 'User_Project',
        foreignKey: 'UserId',
        as: 'projects',
      });
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING,
      field: 'user_name',
    },
    displayName: {
      type: DataTypes.STRING,
      field: 'display_name',
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });
  return User;
};
