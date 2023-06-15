

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Marks', 'createdAt',{
      type: Sequelize.DATE,
      defaultValue: Date.now()
    }),
    await queryInterface.addColumn('Marks', 'updatedAt',{
      type: Sequelize.DATE,
      defaultValue: Date.now()
    }),
    await queryInterface.addColumn('Marks', 'deletedAt',{
      type: Sequelize.DATE,
      defaultValue: null
    }),
    await queryInterface.addColumn('Subjects', 'createdAt',{
      type: Sequelize.DATE,
      defaultValue: Date.now()
    }),
    await queryInterface.addColumn('Subjects', 'updatedAt',{
      type: Sequelize.DATE,
      defaultValue: Date.now()
    }),
    await queryInterface.addColumn('Subjects', 'deletedAt',{
      type: Sequelize.DATE,
      defaultValue: null
    });
    await queryInterface.addColumn('Marks', 'subjectId',{
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Subjects",
        key: "id", 
    }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Marks', 'createdAt')
    await queryInterface.removeColumn('Marks', 'updatedAt')
    await queryInterface.removeColumn('Marks', 'deletedAt')
    await queryInterface.removeColumn('Marks', 'subjectId')
    await queryInterface.removeColumn('Subjects', 'createdAt')
    await queryInterface.removeColumn('Subjects', 'updatedAt')
    await queryInterface.removeColumn('Subjects', 'deletedAt')
  },
};