module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('routes', [{
      name: 'Route_1',
      r_config: '{ "idx": "1" }',
      method: 'get',
      p_id: 3,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Route_2',
      r_config: '{ "idx": "2" }',
      method: 'post',
      p_id: 3,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Route_2',
      r_config: '{ "idx": "2" }',
      method: 'post',
      p_id: 3,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      name: 'Route_3',
      r_config: '{ "idx": "3" }',
      method: 'patch',
      p_id: 4,
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('routes', null, {});
  },
};
