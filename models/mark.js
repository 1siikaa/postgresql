// ----------------------------------------------- schema definitions --------------------------------------
module.exports= (sequelize, DataTypes)=>{ const Mark = sequelize.define("Marks", {
    marks: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    classId : {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Classes",
        key: "id",
    }
  },
    studentId : {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Students",
        key: "id",
    }},
    subjectId : {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Subjects",
        key: "id", 
    }},
  } ,{paranoid:true,
    timestamps:true})
    Mark.associate = (models) => {
      Mark.belongsTo(models.Students, { foreignKey: 'studentId', as: 'student' });
      Mark.belongsTo(models.Subjects, { foreignKey: 'subjectId', as: 'subject' });
    };
    return Mark
    }
  // `sequelize.define` also returns the model
  //console.log(Student === sequelize.models.Students);
  
  
    