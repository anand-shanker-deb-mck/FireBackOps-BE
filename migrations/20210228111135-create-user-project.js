module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_projects', {
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      project_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'projects',
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
    await queryInterface.dropTable('user_projects');
  },
};
