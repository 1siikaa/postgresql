const sequelize = require('../../db')
const { DataTypes, Model } = require("sequelize");
  // ----------------------------------------------- schema definitions --------------------------------------
const Student = sequelize.define("Students", {
  name: DataTypes.STRING,
  email : DataTypes.STRING,
  classId : {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Classes",
      key: "id",
  }},
  age: DataTypes.INTEGER,
  dob: DataTypes.DATE,
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  isDeleted:{
  type:DataTypes.BOOLEAN
  },
  deletedAt: {
      type: DataTypes.DATE,
    }
});

  
// ---------------------------------------------------- exports ----------------------------------------------------------
module.exports = Student;