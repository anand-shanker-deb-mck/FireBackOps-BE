/* eslint-disable no-unused-vars */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_projects', {

      UserId: {
        type: Sequelize.STRING,
        references: {
          model: 'users',
          key: 'user_id',
        },

      },
      ProjectId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'projects',
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_projects');
  },
};
