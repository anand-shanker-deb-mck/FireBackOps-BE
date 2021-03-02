/* eslint-disable camelcase */
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Route_Configuration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Config }) {
      // define association here
      Route_Configuration.belongsToMany(Config, { through: 'Route_Configuration_Dependency' }, { foreignKey: 'RouteConfigurationRouteId' });
    }
  }
  Route_Configuration.init({
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
    RouteId: { type: DataTypes.INTEGER, field: 'route_id' },
    ConfigId: { type: DataTypes.INTEGER, field: 'config_id' },
    sequence: DataTypes.INTEGER,
    refName: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Route_Configuration',
    tableName: 'route_configurations',
  });
  return Route_Configuration;
};
