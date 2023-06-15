const db = require('../../models/index')

// ------------------------------------------------- validation -----------------------------------------------------
const checkIfStudentAlreadyExists = async(req, res, next)=>{
    try{
    const {email} = req.body
    const student = await db.Students.findOne({ where: { email: email} });
    return student ? res.status(409).send({status:false, message: "Student already exist" }):next();
        }
    catch(err){
        return res.status(400).send({status:false, message:"unknown error occured"});
    }
}

// ------------------------------------------------- student not found ----------------------------------------------------
const studentNotFound = async (req, res, next) => {
    try {
      const id = req.params.id;
      const student = await db.Students.findOne({
        where: {
          id: id
        }
      });
      req.userId = id;
      return !student? res.status(404).send({status:false, message: "No student found with this id." }): next();
    } catch (err) {
      return res.status(400).send({status:false, message:"unknown error occured" });
    }
  };


// ------------------------------------------------------ exports ---------------------------------------------------
module.exports = {
    checkIfStudentAlreadyExists, studentNotFound
}