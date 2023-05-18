// ------------------------------------------------- imports -----------------------------------------------------
const sequelize = require('../../db')
const { Sequelize, Op } = require("sequelize");
const Student = require('../../models/student')(sequelize, Sequelize);
const {validateAge, validateClassId, validateStudentId} = require('../validation/validatingStudent')


// ------------------------------------------------- validation -----------------------------------------------------
const checkIfStudentAlreadyExists = async(req, res, next)=>{
    try{
    const {email} = req.body
    const student = await Student.findOne({ where: { email: email} });
    if (student !== null) {
      return res.status(409).send({ message: "Student already exist" });
    }
    next();
    }
    catch(err){
        return res.status(500).send({message:err.message});
    }
}

// ------------------------------------------------- student not found ----------------------------------------------------
const studentNotFound = async (req, res, next) => {
    try {
        if(validateStudentId(req.params.id)){
            return res.status(400).send({ status:false, message: "studentId is not valid."});
           }
      const id = req.params.id;
      const student = await Student.findOne({
        where: {
          id: id,
          isDeleted: false
        }
      });
      if (!student) {
        return res.status(404).send({ message: "No student found with this id." });
      }
      next();
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  };























  
// ------------------------------------------------- validate student -----------------------------------------------------
// const validateStudent = async(req, res, next)=>{
//     try{
//     if(!Object.keys(req.body)){
//         return res.status(400).send({message:"Please provide a body"});
//     }
//     const {name, age, dob, email, classId} = req.body;
//     if(req.method === "POST"){
//     if(!name || !age || !dob  || !email || !classId ){
//         return res.status(400).send({message:"Please fill all the fields"});
//     }
// }
//      if(name && !validateName(name)){
//         return res.status(400).send({message:"Please provide a valid name"});
//      }
//      if(email &&!validateEmail(email)){
//              return res.status(400).send({message:"Please provide a valid email"});
//      }
//      if(age && !validateAge(age)){
//         return res.status(400).send({message:"Please provide a valid age"});
//      }
//      if(dob && !validateDate(dob)){
//         return res.status(400).send({message:"Please provide a valid date"});
//      }
//      if(classId && !validateClassId(classId)){
//         return res.status(400).send({message:"Please provide a valid classId"});
//      }
//           next();
// }
// catch(err){
// return res.status(500).send({"message": err.message});
// }}


// ------------------------------------------------------ exports ---------------------------------------------------
module.exports = {
    checkIfStudentAlreadyExists, studentNotFound
}