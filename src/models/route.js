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
      Route.hasMany(Config, { foreignKey: 'r_id' });
    }
  }
  Route.init({
    name: DataTypes.STRING,
    r_config: DataTypes.JSONB,
    p_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Route',
    tableName: 'routes',
  });
  return Route;
};
