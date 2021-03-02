/* eslint-disable camelcase */
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Route_Configuration_Dependency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
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
