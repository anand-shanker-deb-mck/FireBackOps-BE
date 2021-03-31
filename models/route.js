const {
  Model,
} = require('sequelize');

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
  Route.init({
    name: DataTypes.STRING,
    r_config: {
      type: DataTypes.JSONB,
    },
    pId: {
      type: DataTypes.INTEGER,
      field: 'p_id',
    },
    method: {
      type: DataTypes.STRING,
      field: 'method',
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  }, {
    sequelize,
    modelName: 'Route',
    tableName: 'routes',
  });
  return Route;
};
