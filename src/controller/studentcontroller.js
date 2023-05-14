// ------------------------------------------------------------- Imports ----------------------------------------------

const Student = require('../model/studentModel');

// ------------------------------------------------------------- Fetching all students data ---------------------------------------------
const getStudents = async(req, res) => {
  try {
    const students = await Student.findAll();
        if(students.length===0){
        return res.status(400).send({ message: error.message });
        }
      
      return res.status(200).json(jane);
    
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

// ------------------------------------------------------------- Fetching a student data ---------------------------------------------

const getStudentById = async(req, res) => {
  try {
    const oneStudent = await Student.findAll({"id":req.params.id});
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
    console.log(req.method, req.url, req)
    const { name, email, age, dob , createdAt, updatedAt} = req.body;
    const newStudent = await Student.create({ name, email, age, dob , createdAt, updatedAt });
    return res.status(201).send({ message: "Student added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: err.message });
  }
};
// ------------------------------------------------------------- Updating a Student data ------------------------------------
const updateStudent = async (req, res) => {
  try{
    const id = req.params.id;
    const student = await Student.findAll({"id": id});
    if(student.length === 0){
      return res.status(404).send({ message: "No student found with this id " });
    }
    const { name, email, age, dob, createdAt, updatedAt} = req.body;
    const updatedStudent = await Student.update({"id": id}, {name, email, age, dob, createdAt, updatedAt});
    if(updatedStudent.length==0){
      return res.satus(200).send({"message": "student updated successfully"});
    }

  }
  catch(err){
    return res.status(500).send({ message: err.message });
  }

}

// ------------------------------------------------------------- Deleting a student data ------------------------------------
const deleteStudent = async (req, res) => {
  try{
    const id = req.params.id;
    const student = await Student.findAll({"id": id});
    if(student.length === 0){
      return res.status(404).send({ message: "No student found with this id " });
    }
    const { name, email, age, dob, createdAt, updatedAt} = req.body;
    const updatedStudent = await Student.update({"id": id}, {name, email, age, dob, createdAt, updatedAt});
    if(updatedStudent.length==0){
      return res.satus(200).send({"message": "student updated successfully"});
    }


  }
  catch(err){
    return res.status(500).send({ message: err.message });
  }

}

// ------------------------------------------------------------- Deleting all Student's data --------------------------------
const deleteAllStudent = async (req, res) => {
  try{
    const id = req.params.id;
    const student = await Student.findAll({"id": id});
    if(student.length === 0){
      return res.status(404).send({ message: "Student not found" });
    }
    const { name, email, age, dob, createdAt, updatedAt} = req.body;
    const updatedStudent = await Student.update({"id": id}, {name, email, age, dob, createdAt, updatedAt});
    if(updatedStudent.length==0){
      return res.satus(200).send({"message": "student updated successfully"});
    }


  }
  catch(err){
    return res.status(500).send({ message: err.message });
  }

}
// ------------------------------------------------------------- Fetching the list of all Students --------------------------
const fetchStudentList = async (req, res) => {
  try{

  }
  catch(err){
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
