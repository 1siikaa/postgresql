// ------------------------------------------------- imports -----------------------------------------------------
const Student = require('../model/studentModel')
const {validateName, validateAge, validateDate, validateEmail, validatePassword} = require('../validation/validateStudent')

// ------------------------------------------------- validation -----------------------------------------------------
const checkIfStudentAlreadyExists = async(req, res, next)=>{
    try{
    const {email} = req.body
    const student = await Student.findOne({ where: { email: email} });
    console.log(student);
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
const studentNotFound = async(req, res, next)=>{
    try{
        const id = req.params.id;
        const student = await Student.findOne({where:{id: id}});
        if(student === null){
          return res.status(404).send({ message: "No student found with this id " });
        }
    next();
    }
    catch(err){
            return res.status(500).send({message:err.message});
        }}
// ------------------------------------------------- validate student -----------------------------------------------------
const validateStudent = async(req, res, next)=>{
    try{
    if(!Object.keys(req.body)){
        return res.status(400).send({message:"Please provide a body"});
    }
    const {name, age, date, email, password} = req.body;
    if(req.method === "POST"){
    if(!name && !age && !date && !password && !email ){
        return res.status(400).send({message:"Please fill all the fields"});
    }
}
     if(name && !validateName(name)){
        return res.status(400).send({message:"Please provide a valid name"});
     }
     if(age && !validateAge(age)){
        return res.status(400).send({message:"Please provide a valid age"});

}
     if(date &&!validateDate(date)){
        return res.status(400).send({message:"Please provide a valid date"});
     }
     if(email &&!validateEmail(email)){
        return res.status(400).send({message:"Please provide a valid email"});
          }
    if(password && !validatePassword(password)){
        return res.status(400).send({message:"Please provide a valid password"});
          }
          next();
}
catch(err){
return res.status(500).send({"message": err.message});
}}


// ------------------------------------------------------ exports ---------------------------------------------------
module.exports = {
    checkIfStudentAlreadyExists, validateStudent, studentNotFound
}