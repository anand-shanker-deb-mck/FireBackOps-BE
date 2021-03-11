module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('configurations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      component_type: {
        type: Sequelize.STRING,
      },
      payload: {
        type: Sequelize.JSONB,
      },
      dependencies: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      route_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'routes',
          key: 'id',
        },
      },
      sequence: {
        type: Sequelize.INTEGER,
      },
      ref_name: {
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
    await queryInterface.addConstraint('configurations', {
      type: 'unique',
      fields: ['route_id', 'sequence'],
      name: 'unique_route_seq',
    });
  },
  down: async (queryInterface) => {
    await queryInterface.removeConstraint('configurations', 'unique_route_seq');
    await queryInterface.dropTable('configurations');
  },
};
