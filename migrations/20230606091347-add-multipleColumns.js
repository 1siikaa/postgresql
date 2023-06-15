'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Subjects', 'name', 'subjectName');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Subjects', 'subjectName', 'name');
  }
};

