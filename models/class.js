


  // ----------------------------------------------- schema definitions --------------------------------------
module.exports= (sequelize, DataTypes)=>{ const Class = sequelize.define("Classes", {
  },{
  timestamps:true})
  Class.associate = (models) => {
    Class.hasMany(models.Students, { foreignKey: 'classId', as: 'students' });
  };
  return Class
  }

  // ---------------------------------------------------- exports ----------------------------------------------------------
