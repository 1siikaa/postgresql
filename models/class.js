


  // ----------------------------------------------- schema definitions --------------------------------------
module.exports= (sequelize, DataTypes)=>{ const Class = sequelize.define("Classes", {
  },{
    paranoid: true,
  timestamps:true})
  Class.associate = (models) => {
    Class.hasMany(models.Students, { foreignKey: 'classId', as: 'students' });
  };
  return Class
  }

  
