/* eslint-disable camelcase */
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Configuration extends Model {
    static associate({ Route, Custom_Component }) {
      Configuration.belongsTo(Route, {
        foreignKey: 'routeId',
        onDelete: 'cascade',
        onUpdate: 'cascade',
      });
      Configuration.hasOne(Custom_Component, {
        foreignKey: 'configId',
        as: 'custom_components',
      });
    }
  }
  Configuration.init({
    id: {
      type: DataTypes.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true,
    },
    componentType: {
      type: DataTypes.STRING,
      field: 'component_type',
    },
    payload: DataTypes.JSONB,
    dependencies: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      field: 'dependencies',
    },
    sequence: DataTypes.INTEGER,
    routeId: {
      type: DataTypes.INTEGER,
      field: 'route_id',
    },
    refName: {
      type: DataTypes.STRING,
      field: 'ref_name',
    },
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
  }, {
    sequelize,
    modelName: 'Configuration',
    tableName: 'configurations',
  });
  return Configuration;
};
