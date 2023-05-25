'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Students', 'createdAt',{
      type: Sequelize.DATE,
      defaultValue: Date.now()
    }),
    await queryInterface.addColumn('Classes', 'createdAt',{
      type: Sequelize.DATE,
      defaultValue: Date.now()
    })


  },

  down: async (queryInterface, Sequelize) => {
    
  },
};
