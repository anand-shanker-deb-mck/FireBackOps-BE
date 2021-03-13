module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('custom_components', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.STRING,
        unique: true,
      },
      signature: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      config_id: {
        type: Sequelize.INTEGER,
        unique: true,
        references: {
          model: 'configurations',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      project_id: {
        type: Sequelize.ARRAY((Sequelize.INTEGER)),
      },
      implementation: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('custom_components');
  },
};
