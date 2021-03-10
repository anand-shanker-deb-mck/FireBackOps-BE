/* eslint-disable camelcase */
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Config extends Model {
    static associate({ Route }) {
      Config.belongsToMany(Route, { through: 'Route_Configuration' }, { foreignKey: 'ConfigId' });
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
