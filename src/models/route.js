const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Project, Config }) {
      // define association here
      Route.belongsTo(Project, { foreignKey: 'p_id' });
      Route.belongsToMany(Config, { through: 'Route_Configuration' }, { foreignKey: 'RouteId' });
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
