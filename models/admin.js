

  // ----------------------------------------------- schema definitions --------------------------------------
  module.exports= (sequelize, DataTypes)=>{ const Admin = sequelize.define("Admin", {
    id: {
        allowNull: false,
       autoIncrement: true,
       primaryKey: true,
       type: DataTypes.INTEGER
     },
     isAdmin: {
       type: DataTypes.BOOLEAN,
       defaultValue: true
    },
    name : DataTypes.STRING,
    email : DataTypes.STRING,
    classId : {
     type: DataTypes.INTEGER,
     allowNull: false,
     references: {
       model: "Classes",
       key: "id",
    }
    }
},{
  paranoid: true,
timestamps:true})

return Admin
}



