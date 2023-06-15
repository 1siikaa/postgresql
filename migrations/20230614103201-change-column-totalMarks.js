'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Subjects', 'totalMarks', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 100
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Subjects', 'totalMarks');
  },
};
