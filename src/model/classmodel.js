
const sequelize = require('../../db')
const { DataTypes, Model } = require("sequelize");
  // ----------------------------------------------- schema definitions --------------------------------------
const Class = sequelize.define("Classes", {
  classId : {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Students",
      key: "id",
  }},
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