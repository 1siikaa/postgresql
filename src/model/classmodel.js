
const sequelize = require('../../db')
const { DataTypes, Model } = require("sequelize");
  // ----------------------------------------------- schema definitions --------------------------------------
const Class = sequelize.define("Classes", {
  totalStudents:{
    type: DataTypes.INTEGER,
        defaultValue: 0,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  });

  // ---------------------------------------------------- exports ----------------------------------------------------------
module.exports = Class;