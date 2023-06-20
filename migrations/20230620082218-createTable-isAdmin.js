
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async(queryInterface, Sequelize)=>{
    await queryInterface.createTable('Admin', {
      id: {
         allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    name : Sequelize.STRING,
    email : Sequelize.STRING,
    classId : {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Classes",
        key: "id",
    }
    }
  
  } ,{paranoid:true,
    timestamps:true})
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Admin');
  },
};
