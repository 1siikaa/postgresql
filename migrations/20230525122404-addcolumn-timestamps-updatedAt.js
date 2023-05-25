'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Students', 'updatedAt',{
      type: Sequelize.DATE,
      defaultValue: Date.now()
    }),
    await queryInterface.addColumn('Classes', 'updatedAt',{
      type: Sequelize.DATE,
      defaultValue: Date.now()
    })


  },

  down: async (queryInterface, Sequelize) => {
    
  },
};
