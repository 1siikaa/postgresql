'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Students', 'isDeleted');
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.addColumn('Students', 'isDeleted');
  }
}

