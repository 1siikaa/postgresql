const sequelize = require('../../db')
const { DataTypes, Model } = require("sequelize");
  // ----------------------------------------------- schema definitions --------------------------------------
const Student = sequelize.define("Students", {  //attributes
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
}, {
  paranoid:true,
      timestamps: true,
});
// `sequelize.define` also returns the model
console.log(Student === sequelize.models.Students);


  
// ---------------------------------------------------- exports ----------------------------------------------------------
module.exports = Student;