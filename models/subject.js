// ----------------------------------------------- schema definitions --------------------------------------
module.exports= (sequelize, DataTypes)=>{ const Subject = sequelize.define("Subjects", {
    subjectName: DataTypes.STRING,
    totalMarks : 
    {
      type: DataTypes.INTEGER,
      defaultValue : 100
    },
    classId : {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Classes",
        key: "id",
    }}
  } ,{paranoid:true,
    timestamps:true})
    Subject.associate = (models) => {
      Subject.belongsTo(models.Classes, { foreignKey: 'classId', as: 'class' });
    };
    return Subject
    }
  
  
    