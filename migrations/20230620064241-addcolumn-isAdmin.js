'use strict';

module.exports = {

  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn('Students', 'isAdmin',{
    type: Sequelize.BOOLEAN,
    defaultValue: false
    })
  },

  down: async (queryInterface, Sequelize) => {
  await queryInterface.removeColumn('Students', 'isAdmin')
  },
};
