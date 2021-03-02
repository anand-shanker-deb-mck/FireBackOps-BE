const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Project }) {
      // define association here
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
