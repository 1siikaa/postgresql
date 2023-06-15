
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async(queryInterface, Sequelize)=>{
    await queryInterface.createTable('Marks', {
      id: {
         allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      marks: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    studentId : {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Students",
        key: "id",
    }},
  
  } ,{paranoid:true,
    timestamps:true})
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Marks');
  },
};
