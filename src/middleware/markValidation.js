const db = require('../../models/index')
const {QueryTypes} = require('sequelize')


// ------------------------------------------------- validation -----------------------------------------------------
const checkIfMarkAlreadyExists = async(req, res, next)=>{
    try{
    const {studentId, subjectId, classId} = req.body
    const query = `SELECT "studentId" FROM "Marks" WHERE "studentId"= :studentId AND "subjectId" = :subjectId AND "classId" = :classId AND "deletedAt" IS NULL
    `;
    const Mark = await db.sequelize.query(query, {
        type: QueryTypes.SELECT,
        plain: false,
        replacements : {studentId, subjectId, classId}
    })
      return Mark.length ? res.status(409).send({status:false, message: `Mark already exist for student ${studentId} of class ${classId}` }) : next()
    }
    catch(err){
        return res.status(400).send({status:false, message:"unknown error occured"});
    }
}

module.exports = {
    checkIfMarkAlreadyExists
}