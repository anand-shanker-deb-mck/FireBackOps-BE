const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Config extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Route }) {
      // define association here
      Config.belongsTo(Route, { foreignKey: 'r_id' });
    }
  }
  Config.init({
    type: DataTypes.STRING,
    unique_friendly_name: DataTypes.STRING,
    payload: DataTypes.JSONB,
    order: DataTypes.INTEGER,
    r_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Config',
    tableName: 'configs',
  });
  return Config;
};
