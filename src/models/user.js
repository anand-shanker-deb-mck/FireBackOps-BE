const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Project }) {
      User.belongsToMany(Project, { through: 'User_Project' }, { foreignKey: 'UserId' });
    }
  }
  User.init({
    user_id: DataTypes.STRING,
    display_name: DataTypes.STRING,
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });
  return User;
};
