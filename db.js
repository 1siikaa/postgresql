const { Sequelize } = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: 'postgres'
});

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((err) => console.error(err));

module.exports = sequelize;