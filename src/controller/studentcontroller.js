// ------------------------------------------------------------- Imports ----------------------------------------------
const Student = require('../model/studentModel');
const { Sequelize, Op } = require("sequelize");

// ------------------------------------------------------------- Fetching all students data ---------------------------------------------
const getStudents = async(req, res) => {
  try {
    const students = await Student.findAll();
        if(students.length===0){
        return res.status(400).send({ message: error.message });
        }
      
      return res.status(200).json(students);
    
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

// ------------------------------------------------------------- Fetching a student data ---------------------------------------------

const getStudentById = async(req, res) => {
  try {
    const oneStudent = await Student.findAll({"id":req.params.id});
    console.log(oneStudent);
    if(oneStudent.length === 0){
      return res.status(404).send({ message: "No student found with this id " });
    }
    return res.status(200).json(oneStudent);
  
  } catch (err) {
    return res.satus(500).send({ message: err.message });
  }
};

// ------------------------------------------------------------- Inserting a student data ---------------------------------------------
const addStudent = async (req, res) => {
  try {
    const { name, email, age, dob, createdAt, updatedAt } = req.body;

    const student = await Student.findOne({ where: { email: email } });
    console.log(student);
    if (student !== null) {
      return res.status(409).send({ message: "Student already exists" });
    }
    const newStudent = await Student.create({
      name,
      email,
      age,
      dob,
      createdAt,
      updatedAt,
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
    const { name, email, age, dob } = req.body;
const student = await Student.findOne({
  where: {
    email: email,
    id: {
      [Op.not]: req.params.id // Exclude the student with req.params.id
    }
  }
});
console.log(student);
if (student !== null) {
  return res.status(409).send({ message: "Student already exists with this email" });
}
    const updatedStudent = await Student.update(
      { name, email, age, dob },
      { where: { id: req.params.id } }
    );

    if (updatedStudent[0] === 0) {
      return res.status(404).send({ message: "Student not found" });
    }

    return res.status(200).send({ message: "Student updated successfully" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};


// ------------------------------------------------------------- Deleting a student data ------------------------------------
const deleteStudent = async (req, res) => {
  try{
    const deletedStudent = await Student.destroy({where:{id:req.params.id}});
    if(!deletedStudent)
    return res.status(200).send({"message": "student deleted successfully"});
  }
  catch(err){
    return res.status(500).send({ message: err.message });
  }}

// ------------------------------------------------------------- Deleting all Student's data --------------------------------
const deleteAllStudent = async (req, res) => {
  try {
      if(!Object.keys(req.query).length){
      await Student.destroy({ where: {} }); // Empty where condition to delete all students
      return res.status(200).send({ message: "All students deleted successfully" });
      }
      else{
      const deletedStudents = await Student.destroy({ where: {}  });
      if(!deletedStudents)
      return res.status(200).send({ message: "All these students deleted successfully" });
      }

    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
   

}
// ------------------------------------------------------------- Fetching the list of all Students --------------------------
const fetchStudentList = async (req, res) => {
  try {
    const students = await Student.findAll({
      attributes: ['name'], // Specify the 'name' attribute only
    });

    const studentCount = await Student.count(); // Count the number of students

    if (students.length === 0) {
      return res.status(400).send({ message: "No students found" });
    }

    const studentNames = students.map((student) => student.name);

    return res.status(200).json({ count: studentCount, students: studentNames });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}


// -------------------------------------------------------------- exports -------------------------------------------
module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
  deleteAllStudent,
  fetchStudentList
};
