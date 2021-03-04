module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('route_configurations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      route_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'routes',
          key: 'id',
        },
      },
      config_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'configs',
          key: 'id',
        },
      },
      sequence: {
        type: Sequelize.INTEGER,
      },
      refName: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('route_configurations');
  },
};
