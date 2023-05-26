'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Students', 'PostOffice',{
      type: Sequelize.ARRAY(Sequelize.JSONB),
      defaultValue: []
    })


  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Students', 'PostOffice')
  },
};
