// ------------------------------------------------------------- Imports ----------------------------------------------
const sequelize = require('../../db')
const { Sequelize, Op } = require("sequelize");
const Student = require('../../models/student')(sequelize, Sequelize);
const Class = require('../../models/class')(sequelize, Sequelize);
const {validateAge, validateClassId, validateStudentId} = require('../validation/validatingStudent')


// ------------------------------------------------------------- Fetching all students data ---------------------------------------------

const getStudents = async(req, res) => {
  try {
    const students = await Student.findAll({where:{isDeleted:false}});
        if(students.length===0){
        return res.status(400).send({ message: "no data found." });
        }
      return res.status(200).json(students);
    
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

// ------------------------------------------------------------- Fetching a student data ---------------------------------------------


const getStudentById = async(req, res) => {
  try {
    if(validateStudentId(req.params.id)){
     return res.status(400).send({ status:false, message: "studentId is not valid."});
    }
    const oneStudent = await Student.findOne({where:{id:req.params.id, isDeleted:false}});
    
    if(!oneStudent){
      return res.status(404).send({ message: "No student found with this id " });
    }
    return res.status(200).json(oneStudent);
  
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
  
};

// ------------------------------------------------------------- Inserting a student data ---------------------------------------------
const addStudent = async (req, res) => {
  try {
    if(!Object.keys(req.body).length){
      return res.status(400).send({status:false, message: "provide all the mandatory fields." });
    }
    const { name, email, age, dob, classId } = req.body;
    const classInstance = await Class.findByPk(classId);

    if (!classInstance) {
      return res.status(404).send({ message: "Class not found" });
    }

    const student = await Student.findOne({ where: { email: email } });

    if (student !== null) {
      return res.status(409).send({ message: "Student already exists" });
    }
    if(!validateAge(age)){
      return res.status(400).send({ message: "Invalid age" });
    }

    if(!validateClassId(classId)){
      return res.status(400).send({ message: "Invalid class id" });
    }
    const newStudent = await Student.create({
      name,
      email,
      classId,
      age,
      dob
    });

    const updatedStudentList = [...classInstance.studentList, newStudent];
    const updatedTotalStudents = classInstance.totalStudents + 1;

    await classInstance.update({
      studentList: updatedStudentList,
      totalStudents: updatedTotalStudents,
    });

    return res.status(201).send({ message: "Student added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: err.message });
  }
};


// ------------------------------------------------------------- Updating a Student data ------------------------------------
const updateStudent = async (req, res) => {
  try {
   
    if(!Object.keys(req.body).length){
      return res.status(200).send({ message: "Student is already updated." });
    }
    if(!validateAge(age)){
      return res.status(400).send({ message: "Invalid age" });
    }

    const { name, age, dob} = req.body;
     let updatedAt = Date.now();
     await Student.update(
      { name, age, dob,updatedAt},
      { where: { id: req.params.id , isDeleted:false} }
    );
    
    const student = await Student.findByPk(req.params.id);
    const classInstance = await Class.findByPk(student.classId);

    if (!classInstance) {
      return res.status(404).send({ message: "Class not found" });
    }

    const updatedStudentList = classInstance.studentList.map((s) =>
      s.id === student.id ? student : s
    );

    await classInstance.update({ studentList: updatedStudentList });


    return res.status(200).send({ message: "Student updated successfully"});
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};



// ------------------------------------------------------------- Deleting a student data ------------------------------------
const deleteStudent = async (req, res) => {
  try {
  
    await Student.update(
      { isDeleted: true, deletedAt: Date.now() },
      { where: { id: req.params.id } }
    );
    const student = await Student.findByPk(req.params.id);
    

    const classInstance = await Class.findByPk(student.classId);
   console.log(classInstance.Classes)
   
    if (!classInstance) {
      return res.status(404).send({ message: "Class not found" });
    }

   

    const updatedStudentList = classInstance.studentList.map((s) =>
      s.id === student.id ? `student deleted with id ${req.params.id}` : s
    );
    const updatedTotalStudents = classInstance.totalStudents-1;

    await classInstance.update({
      studentList: updatedStudentList,
      totalStudents: updatedTotalStudents,
    });

    return res.status(200).send({ message: "Student deleted successfully" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};


// ------------------------------------------------------------- Fetching the list of all Students --------------------------
const fetchStudentList = async (req, res) => {
  try {
    const students = await Student.findAll({
      where: {
        isDeleted: false
      },
      attributes: ['name'], // Specify the 'name' attribute only
    });

    const studentCount = await Student.count({
      where: {
        isDeleted: false
      }
    }); // Count the number of students with isDeleted as false

    if (students.length === 0) {
      return res.status(400).send({ message: "No students found" });
    }

    const studentNames = students.map((student) => student.name);
    return res.status(200).json({ count: studentCount, students: studentNames });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};



// -------------------------------------------------------------- exports -------------------------------------------
module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
  fetchStudentList
};
