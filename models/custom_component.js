/* eslint-disable camelcase */
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Custom_Component extends Model {
    static associate({ Configuration }) {
      Custom_Component.belongsTo(Configuration, {
        foreignKey: 'configId',
        onDelete: 'cascade',
        onUpdate: 'cascade',
      });
    }
  }
  Custom_Component.init({
    type: {
      type: DataTypes.STRING,
      field: 'type',
      unique: true,
    },
    signature: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      field: 'signature',
    },
    configId: {
      type: DataTypes.INTEGER,
      field: 'config_id',
      unique: true,
    },
    projectId: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      field: 'project_id',
    },
    implementation: {
      type: DataTypes.STRING,
      field: 'implementation',
    },
  }, {
    sequelize,
    modelName: 'Custom_Component',
    tableName: 'custom_components',
  });
  return Custom_Component;
};
