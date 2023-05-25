'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Classes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
}, {
    paranoid:true,
    timestamps: true,
});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Classes');
  }
};


