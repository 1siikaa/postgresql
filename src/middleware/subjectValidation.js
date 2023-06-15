const db = require('../../models/index')
const {QueryTypes} = require('sequelize')


// ------------------------------------------------- validation -----------------------------------------------------
const checkIfSubjectAlreadyExists = async(req, res, next)=>{
    try{
    const {subjectName , classId} = req.body
    const query = `SELECT "Subjects"."subjectName" FROM "Subjects" WHERE "Subjects"."subjectName"= :subjectName AND "Subjects"."classId" = :classId AND "Subjects"."deletedAt" IS NULL`;
    const subject = await db.sequelize.query(query, {
        type: QueryTypes.SELECT,
        plain: false,
        replacements : {subjectName, classId}
    })
      return subject.length ? res.status(409).send({status:false, message: `Subject already exist for class ${classId}` }) : next()
    }
    catch(err){
        return res.status(500).send({status:false, message:err.message});
    }
}

module.exports = {
    checkIfSubjectAlreadyExists
}