const {
  Model,
} = require('sequelize');

module.exports = (sequelize) => {
  // eslint-disable-next-line camelcase
  class User_Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association h
    // }
  }
  User_Project.init({

  }, {
    sequelize,
    modelName: 'User_Project',
    tableName: 'user_projects',
  });
  // eslint-disable-next-line camelcase
  return User_Project;
};
