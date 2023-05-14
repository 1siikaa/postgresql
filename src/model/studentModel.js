const { Sequelize, Model, DataTypes } = require("sequelize");
require('dotenv').config();
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'postgres'
  });
  
  sequelize.authenticate()
  .then(()=> console.log('Connection has been established successfully.'))
  .catch((err)=> console.error(err))

const Student = sequelize.define("users", {
  name: DataTypes.STRING,
  email : DataTypes.STRING,
  age: DataTypes.INTEGER,
  dob: DataTypes.DATE,
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

  

module.exports = Student;