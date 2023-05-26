'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Students', 'PostOffice', {
      type: Sequelize.JSON,
      defaultValue: null
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removecolumn('Students', 'PostOffice');
  },
};

