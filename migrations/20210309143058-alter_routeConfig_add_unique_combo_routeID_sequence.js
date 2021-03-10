module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addConstraint('route_configurations', {
      type: 'unique',
      fields: ['route_id', 'sequence'],
      name: 'unique_routeId_seq_combo',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeConstraint('route_configurations', 'unique_routeId_seq_combo');
  },
};
