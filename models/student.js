'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Student.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    classId : {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Classes",
        key: "id",
    }},
    age: DataTypes.INTEGER,
    dob: DataTypes.DATE,
    isDeleted:{
      type:DataTypes.BOOLEAN,
      defaultValue:false}
      ,
      deletedAt:DataTypes.DATE,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Students',
  });
  return Student;
};