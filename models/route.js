const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    static associate({ Project, Configuration }) {
      Route.belongsTo(Project, {
        foreignKey: 'p_id',
      });
      Route.hasMany(Configuration, {
        foreignKey: 'routeId',
        as: 'configurations',
      });
    }
  }
  Route.init({
    name: DataTypes.STRING,
    r_config: DataTypes.JSONB,
    p_id: DataTypes.INTEGER,
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
  }, {
    sequelize,
    modelName: 'Route',
    tableName: 'routes',
  });
  return Route;
};
