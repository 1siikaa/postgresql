'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Students', 'Pincode',{
      type: Sequelize.STRING,
      defaultValue: null
    })
    
    


  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Students', 'Pincode')
  },
};
