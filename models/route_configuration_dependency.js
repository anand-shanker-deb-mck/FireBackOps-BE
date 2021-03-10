/* eslint-disable camelcase */
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Route_Configuration_Dependency extends Model {
    static associate({ Route_Configuration, Config }) {
      Route_Configuration_Dependency.belongsTo(Route_Configuration, { foreignKey: 'RouteConfigurationRouteId' });
      Route_Configuration_Dependency.belongsTo(Config, { foreignKey: 'ConfigId' });
    }
  }
  Route_Configuration_Dependency.init({
    RouteConfigurationRouteId: { type: DataTypes.INTEGER, field: 'rc_id' },
    ConfigId: { type: DataTypes.INTEGER, field: 'dependencies' },
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
  }, {
    sequelize,
    modelName: 'Route_Configuration_Dependency',
    tableName: 'route_configuration_dependencies',
  });
  return Route_Configuration_Dependency;
};
