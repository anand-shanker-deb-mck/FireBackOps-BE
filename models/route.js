const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    static associate({ Project, Configuration }) {
      Route.belongsTo(Project, {
        foreignKey: 'p_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
      Route.hasMany(Configuration, {
        foreignKey: 'routeId',
        as: 'configurations',
      });
    }
  }
  Route.init(
    {
      name: DataTypes.STRING,
      r_config: {
        type: DataTypes.JSONB,
      },
      p_id: {
        type: DataTypes.INTEGER,
      },
      method: {
        type: DataTypes.STRING,
        field: 'method',
      },
      end_point: {
        type: DataTypes.STRING,
        field: 'end_point',
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
    },
    {
      sequelize,
      modelName: 'Route',
      tableName: 'routes',
    },
  );
  return Route;
};
