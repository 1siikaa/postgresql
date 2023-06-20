'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Admin', 'createdAt',{
      type: Sequelize.DATE,
      defaultValue: Date.now()
    }),
    await queryInterface.addColumn('Admin', 'updatedAt',{
      type: Sequelize.DATE,
      defaultValue: Date.now()
    }),
    await queryInterface.addColumn('Admin', 'deletedAt',{
      type: Sequelize.DATE,
      defaultValue: null
    })
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Admin', 'createdAt')
    await queryInterface.removeColumn('Admin', 'updatedAt')
    await queryInterface.removeColumn('Admin', 'deletedAt')
  },
};
