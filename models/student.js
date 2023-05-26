
  // ----------------------------------------------- schema definitions --------------------------------------
  module.exports= (sequelize, DataTypes)=>{ const Student = sequelize.define("Students", {
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
  isDeleted:{
  type:DataTypes.BOOLEAN
  },
  Pincode: DataTypes.STRING,
  PostOffice: DataTypes.JSON,
} ,{paranoid:true,
  timestamps:true})
  Student.associate = (models) => {
    Student.belongsTo(models.Classes, { foreignKey: 'classId', as: 'class' });
  };
  return Student
  }
// `sequelize.define` also returns the model
//console.log(Student === sequelize.models.Students);


  
