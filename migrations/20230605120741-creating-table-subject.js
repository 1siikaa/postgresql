'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async(queryInterface, Sequelize)=>{
    await queryInterface.createTable('Subjects', {
      id: {
         allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: Sequelize.STRING,
    totalMarks : Sequelize.INTEGER,
    classId : {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Classes",
        key: "id",
    }}
  } ,{paranoid:true,
    timestamps:true})
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Subjects');
  },
};

