module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'routes',
      'method',
      {
        type: Sequelize.STRING,
      },
    );
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(
      'routes',
      'method', {},
    );
  },
};
