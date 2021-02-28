/* eslint-disable no-unused-vars */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('configs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.STRING,
      },
      unique_friendly_name: {
        type: Sequelize.STRING,
      },
      payload: {
        type: Sequelize.JSONB,
      },
      order: {
        type: Sequelize.INTEGER,
      },
      r_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'routes',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('configs');
  },
};
