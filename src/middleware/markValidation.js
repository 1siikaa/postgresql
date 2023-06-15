const db = require('../../models/index')
const {QueryTypes} = require('sequelize')


// ------------------------------------------------- validation -----------------------------------------------------
const checkIfMarkAlreadyExists = async(req, res, next)=>{
    try{
    const {studentId, subjectId, classId} = req.body
    const query = `SELECT "Marks"."studentId" FROM "Marks" WHERE "Marks"."studentId"= :studentId AND "Marks"."subjectId" = :subjectId AND "Marks"."classId" = :classId AND "Marks"."deletedAt" IS NULL
    `;
    const Mark = await db.sequelize.query(query, {
        type: QueryTypes.SELECT,
        plain: false,
        replacements : {studentId, subjectId, classId}
    })
      return Mark.length ? res.status(409).send({status:false, message: `Mark already exist for student ${studentId} of class ${classId}` }) : next()
    }
    catch(err){
        return res.status(500).send({status:false, message:err.message});
    }
}

module.exports = {
    checkIfMarkAlreadyExists
}