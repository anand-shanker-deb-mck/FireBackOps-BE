/* eslint-disable camelcase */
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Config extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Route_Configuration, Route }) {
      Config.belongsToMany(Route, { through: 'Route_Configuration' }, { foreignKey: 'ConfigId' });
      Config.belongsToMany(Route_Configuration, { through: 'Route_Configuration_Dependency' }, { foreignKey: 'ConfigId' });
    }
  }
  Config.init({
    type: DataTypes.STRING,
    payload: DataTypes.JSONB,
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
  }, {
    sequelize,
    modelName: 'Config',
    tableName: 'configs',
  });
  return Config;
};
