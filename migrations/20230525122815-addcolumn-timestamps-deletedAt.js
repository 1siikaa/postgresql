'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Students', 'deletedAt',{
      type: Sequelize.DATE,
      defaultValue: null
    }),
    await queryInterface.addColumn('Classes', 'deletedAt',{
      type: Sequelize.DATE,
      defaultValue: null
    })


  },

  down: async (queryInterface, Sequelize) => {
    
  },
};
