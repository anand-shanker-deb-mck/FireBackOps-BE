module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addConstraint('routes', {
      type: 'unique',
      fields: ['id', 'method', 'name'],
      name: 'unique_routename_method',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeConstraint('routes', 'unique_routename_method');
  },
};
