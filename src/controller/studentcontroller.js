// ------------------------------------------------------------- Imports ----------------------------------------------
const sequelize = require('../../db')
const { Sequelize, Op } = require("sequelize");
const Student = require('../../models/student')(sequelize, Sequelize);
const Class = require('../../models/class')(sequelize, Sequelize);
const {validateAge, validateClassId, validateEmail} = require('../validation/validatingStudent')


// ------------------------------------------------------------- Fetching all students data ---------------------------------------------

const getStudents = async (req, res) => {
  try {
    if (!Object.keys(req.query).length) {
      const students = await Student.findAll({ where: { isDeleted: false } });
      if (students.length === 0) {
        return res.status(404).send({status:false,  message: "No data found." });
      }
      return res.status(200).send({status:true, data:students});
    } else {
      if(['id', 'name', 'email', 'classId', 'age', 'dob'].includes(...Object.keys(req.query))){
      const { id, name, email, age, dob, classId } = req.query;
      const searchConditions = { isDeleted: false };

      if (id) {
        // validate the student ID if provided
        if(isNaN(id)){
          return res.status(400).send({ status:false, message: "studentId is not valid."});
        }
        searchConditions.id = Number(id);
      }

      if(email){
        if(!validateEmail){
          return res.status(400).send({ status:false, message: "email is not valid."});
        }
        searchConditions.email=  { [Op.iLike]: `%${email}%` };
      }
      
      if(classId){
        if(isNaN(classId)){
          return res.status(400).send({ status:false, message: "classId is not valid."});
        }
        searchConditions.classId = Number(classId);
      }

      if (name) {
        searchConditions.name = { [Op.iLike]: `%${name}%` };
      }

      if (age) {
        if(isNaN(classId)){
          return res.status(400).send({ status:false, message: "age is not valid."});
        }   // validate the age if provided
        searchConditions.age = age;
      }

      if (dob) {
        searchConditions.dob = dob;
      }

      const students = await Student.findAll({ where: searchConditions });

      if (students.length === 0) {
        return res.status(404).send({status:false, message: "No matching data found." });
      }

      return res.status(200).send({status:true, message:` ${students.length} matching results found`, data :students});
    }
    else{
      return res.status(400).send({status:false, message: "query name can contain id, name, age, dob, email, classId parameter "})
    }
    }
  } catch (err) {
    return res.status(500).send({status:false, message: err.message });
  }
};

// ------------------------------------------------------------- Fetching a student data ---------------------------------------------


const getStudentById = async(req, res) => {
  try {

    const oneStudent = await Student.findOne({where:{id:req.params.id, isDeleted:false}});
    
    if(!oneStudent){
      return res.status(404).send({status:false, message: "No student found with this id " });
    }
    return res.status(200).send({status:true, data:oneStudent});
  
  } catch (err) {
    return res.status(500).send({status:false, message: err.message });
  }
  
};

// ------------------------------------------------------------- Inserting a student data ---------------------------------------------
const addStudent = async (req, res) => {
  try {
    
    let { name, email, age, dob, classId } = req.body;
    const classInstance = await Class.findByPk(classId);
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase().replace(/ /g, "");
    if (!classInstance) {
      return res.status(404).send({status:false, message: "Class not found" });
    }

    if(age && !validateAge(age)){
      return res.status(400).send({status: false, message: "Invalid age" });
    }

    if(classId && !validateClassId(classId)){
      return res.status(400).send({status:false, message: "Invalid class id" });
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

    return res.status(201).send({status:true, message: "Student added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({status:false, message: err.message });
  }
};


// ------------------------------------------------------------- Updating a Student data ------------------------------------
const updateStudent = async (req, res) => {
  try {
    if(!Object.keys(req.body).length){
      return res.status(200).send({status:true, message: "Student is already updated." });
    }
    let { name, age, dob} = req.body;
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase().replace(/ /g, "");
    if(age && !validateAge(age)){
      return res.status(400).send({status:false, message: "Invalid age" });
    }
     let updatedAt = Date.now();
     await Student.update(
      { name, age, dob,updatedAt},
      { where: { id: req.params.id , isDeleted:false} }
    );
    
    const student = await Student.findByPk(req.params.id);
    const classInstance = await Class.findByPk(student.classId);
    const updatedStudentList = classInstance.studentList.map((s) =>
      s.id === student.id ? student : s
    );

    await classInstance.update({studentList: updatedStudentList });


    return res.status(200).send({status:true, message: "Student updated successfully"});
  } catch (err) {
    return res.status(500).send({status:false, message: err.message });
  }
};



// ------------------------------------------------------------- Deleting a student data ------------------------------------
const deleteStudent = async (req, res) => {
  try {
  
    await Student.update(
      { isDeleted: true, deletedAt: Date.now() },
      { where: { id: req.params.id } }
    );

    // await Student.destroy({ where:{id: req.params.id}}
    const student = await Student.findByPk(req.params.id);
    

    const classInstance = await Class.findByPk(student.classId);
    const updatedStudentList = classInstance.studentList.map((s) =>
      s.id === student.id ? `student deleted with id ${req.params.id}` : s
    );
    const updatedTotalStudents = classInstance.totalStudents-1;

    await classInstance.update({
      studentList: updatedStudentList,
      totalStudents: updatedTotalStudents,
    });

    return res.status(200).send({status:true, message: "Student deleted successfully" });
  } catch (err) {
    return res.status(500).send({status:false,  message: err.message });
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
      return res.status(404).send({ status:false, message: "No students found" });
    }

    const studentNames = students.map((student) => student.name);
    return res.status(200).json({status:true, count: studentCount, data: studentNames });
  } catch (err) {
    return res.status(500).send({status:false, message: err.message });
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
