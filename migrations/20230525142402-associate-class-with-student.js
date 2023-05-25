'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Students', 'classId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Classes',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Students', 'classId');
  },
};

