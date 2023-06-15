// ------------------------------------------------------------- Imports ----------------------------------------------
const axios = require('axios');
const db = require('../../models/index')
const {isValidEmail} = require('../validation/validatingStudent');
const {Op} = require('sequelize')

// ------------------------------------------------------------- Fetching all students data ---------------------------------------------

const getStudents = async (req, res) => {
  try {
      if (!Object.keys(req.query).length) {
        const students = await db.Students.findAll({
          include: [{ model: db.Classes, as: 'class' }] // Include the 'Classes' model to populate the classId
      });
        if (students.length === 0) {
          return res.status(404).send({ status: false, message: "No data found." });
        }
        return res.status(200).send({ status: true, data: students});
    } else {
      if(['id', 'name', 'email', 'classId', 'age', 'dob'].includes(...Object.keys(req.query))){
         
      const { id, name, email, age, dob, classId } = req.query;
      const searchConditions = { };

      if (id) {
        // validate the student ID if provided
        if(isNaN(id)){
          return res.status(400).send({ status:false, message: "studentId is not valid."});
        }
        searchConditions.id = Number(id);
      }

      if(email){
        if(!isValidEmail){
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
        if(isNaN(age)){
          return res.status(400).send({ status:false, message: "age is not valid."});
        }   // validate the age if provided
        searchConditions.age = age;
      }

      if (dob) {
        searchConditions.dob = dob;
      }

      const students = await db.Students.findAll({ where: searchConditions ,
        include: [{ model: db.Classes, as: 'class' }]});

      if (students.length === 0) {
        return res.status(404).send({status:false, message: "No matching data found." });
      }

      return res.status(200).send({status:true, message:` ${students.length} matching responses found`, data :students});
    }
    else{
      return res.status(400).send({status:false, message: "query name can contain id, name, age, dob, email, classId parameter "})
    }
    }
  } catch (err) {
    return res.status(400).send({status:false, message: 'unknown error occured' });
  }
};

// ------------------------------------------------------------- Fetching a student data ---------------------------------------------
const getStudentById = async(req, res) => {
  try {

    const oneStudent = await db.Students.findOne({where:{id:req.params.id},
      include: [{ model: db.Classes, as: 'class' }]});
    
    if(!oneStudent){
      return res.status(404).send({status:false, message: "No student found with this id " });
    }
    return res.status(200).send({status:true, data:oneStudent});
  
  } catch (err) {
    return res.status(400).send({status:false, message: 'unknown error occured' });
  }

};

// ------------------------------------------------------------- Inserting a student data ---------------------------------------------
const addStudent = async (req, res) => {
  try {
    let { name, email, age, dob, classId } = req.body;
    const classInstance = await db.Classes.findByPk(classId);
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase().replace(/ /g, "");

    return (
      classInstance
        ? axios
            .get(`https://api.postalpincode.in/pincode/${req.body.Pincode}`)
            .then ((response)=> {
              console.log(response.data[0])
              
              const details = response.data && response.data.length && response.data[0]? response.data[0] : null;
              console.log(details)
              return db.Students.create({
                name,
                email,
                classId,
                age,
                dob,
                Pincode: req.body.Pincode,
                PostOffice: details,
              });
            })
            .then(() => res.status(201).send({ status: true, message: "Student added successfully" }))
            .catch((error) => res.status(400).send({ status: false, message: 'try again later' }))
        : res.status(400).send({ status: false, message: "Invalid input data" })
    );
  } catch (err) {
    return res.status(400).send({ status: false, message: 'unknown error occurred' });
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

     await db.Students.update(
      { name, age, dob},
      { where: { id: req.params.id } }  
    );

    return res.status(200).send({status:true, message: "Student updated successfully"});
  } catch (err) {
    return res.status(400).send({status:false, message: "unknown error occured" });
  }
};

// ------------------------------------------------------------- Deleting a student data ------------------------------------
const deleteStudent = async (req, res) => {
  try {
 return await db.Students.destroy(
      { where: { id: req.params.id } }
    ) ? 
    res.status(200).send({status:true, message: "Student deleted successfully" }) :
    res.status(404).send({status: false, message:'not found'});
  } catch (err) {
    return res.status(400).send({status:false,  message: 'unknown error occured' });
  }
};


// ------------------------------------------------------------- Fetching the list of all Students --------------------------
const fetchStudentList = async (req, res) => {
  try {
    const students = await db.Students.findAll({
      attributes: ['name'],                              // Specify the 'name' attribute only
    });
    const studentCount = await db.Students.count(); // Count the number of students with isDeleted as false
    return studentCount ? res.status(200).json({status:true, count: studentCount, data: students }): res.status(404).send({status:false, message: "no student found"})
  } catch (err) {
    return res.status(400).send({status:false, message: 'unknown error occured' });
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
