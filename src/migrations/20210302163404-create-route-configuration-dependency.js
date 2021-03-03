module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('route_configuration_dependencies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      rc_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'route_configurations',
          key: 'id',
        },
      },
      dependencies: {
        type: Sequelize.INTEGER,
        references: {
          model: 'configs',
          key: 'id',
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('route_configuration_dependencies');
  },
};
