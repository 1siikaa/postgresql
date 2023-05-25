
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Students', 'classId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Classes",
        key: "id",
    }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Students', 'classId', {
      type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Classes",
          key: "id",
      }
    });
  },
};
