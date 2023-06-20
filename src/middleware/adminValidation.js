const db = require('../../models/index')
const {QueryTypes} = require('sequelize')


// ------------------------------------------------- validation -----------------------------------------------------
const checkIfAdminAlreadyExists = async(req, res, next)=>{
    try{
    const {email, classId} = req.body
    const query = `SELECT "email" FROM "Admin" WHERE email= :email AND "classId" = :classId AND "deletedAt" IS NULL
    `;
    const Admin = await db.sequelize.query(query, {
        type: QueryTypes.SELECT,
        plain: false,
        replacements : {email, classId}
    })
      return Admin.length ? res.status(409).send({status:false, message: `Admin already exist` }) : next()
    }
    catch(err){
        return res.status(400).send({status:false, message:"unknown error occured", message: err.message});
    }
}


const isAdminOrStudent = async (req, res, next) => {
    try{   
        console.log(process.user)
 return (process.user == "Admin" || process.user == "Students") ? next() : res.status(403).send({status:false, message: "access denied"})
    }
    catch(err){

    }
}

const isAdmin = async (req, res, next)=> {
    try{   
        return (process.user === "Admin") ? next() : res.status(403).send({status:false, message: "access denied"})
           }
           catch(err){
       
           }   
}


module.exports = {
    checkIfAdminAlreadyExists, isAdminOrStudent, isAdmin
}