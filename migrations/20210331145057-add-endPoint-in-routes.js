module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('routes', 'end_point', {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('routes', 'end_point', {
      type: Sequelize.STRING,
    });
  },
};
