/* eslint-disable camelcase */
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Route_Configuration extends Model {
    static associate({ Config, Route }) {
      Route_Configuration.belongsTo(Config, { foreignKey: 'ConfigId' });
      Route_Configuration.belongsTo(Route, { foreignKey: 'RouteId' });
    }
  }
  Route_Configuration.init({
    id: {
      type: DataTypes.INTEGER, field: 'id', primaryKey: true, autoIncrement: true,
    },
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
