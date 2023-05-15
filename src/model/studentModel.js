// ------------------------------------------- imports -----------------------------------------------------------
const { Sequelize, Model, DataTypes } = require("sequelize");
require('dotenv').config();

// 
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'postgres'
  });
  
  sequelize.authenticate()
  .then(()=> console.log('Connection has been established successfully.'))
  .catch((err)=> console.error(err))

  // ----------------------------------------------- schema definitions --------------------------------------
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

  
// ---------------------------------------------------- exports ----------------------------------------------------------
module.exports = Student;














// class User extends Model {}

// User.init({
//   // Model attributes are defined here
//   firstName: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   lastName: {
//     type: DataTypes.STRING
//     // allowNull defaults to true
//   }
// }, {
//   // Other model options go here
//   sequelize, // We need to pass the connection instance
//   modelName: 'User' // We need to choose the model name
// });

// // the defined model is the class itself
// console.log(User === sequelize.models.User); // true