module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('projects', [{
      name: 'Project_1',
      p_attributes: '{ "type": "default" }',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Project_2',
      p_attributes: '{ "type": "default" }',
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('projects', null, {});
  },
};
