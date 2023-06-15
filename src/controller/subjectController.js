const db = require('../../models/index')
const { QueryTypes } = require("sequelize");

const addSubject = async(req, res)=>{
    try{
        const {totalMarks, subjectName, classId} = req.body;
        let query = `INSERT INTO "Subjects" ( "subjectName", "classId") VALUES ( :subjectName, :classId)`;
        const results = await db.sequelize.query(query, {
            replacements: {  subjectName, classId },
        });
        return res.status(201).send({status:true, message: "added successfully."})
        }
        catch(err){
            return res.status(400).send({status:false, message: 'unknown error occured', error: err.message});
        }
}

const getSubjects = async(req, res)=>{
    try{
        let query = `SELECT "Subjects"."subjectName" , "Subjects"."id", "Subjects"."classId", "Subjects"."totalMarks" FROM "Subjects" WHERE "Subjects"."deletedAt" IS null`;
        const {classId, subjectId, subjectName} = req.query
        if(classId){
        query += ` AND "Subjects"."classId" = :classId`
        }
        if(subjectId){
        query += ` AND "Subjects"."id" = :subjectId`
        }
        if(subjectName){
        query += ` AND "Subjects"."subjectName" ILIKE :subjectName`
    }
   const subjects = await db.sequelize.query( query,{
      type: QueryTypes.SELECT,
      replacements : {classId, subjectId, subjectName: `%${subjectName}%`},
      plain: false,
   })
   return res.status(200).send({status:true, message:'total Subjects are' , data: subjects});
    }
    catch(err){
        return res.status(400).send({status:false, message:'unknown error occured', error: err.message});
    }
}

const updateMarks = async(req, res)=>{
    try{
    const {marks, subjectId}= req.body
    let query = `UPDATE "Marks" SET marks=:marks, "updatedAt"= now() WHERE "studentId"=:id AND "subjectId"= :subjectId AND "Marks"."deletedAt" IS null`;
    const results = await db.sequelize.query(query, {
        replacements: { id: `${req.params.id}`, marks , subjectId},
    });
    return results[1] ? res.status(200).send({status:true, message:"updated successfully"}): res.status(400).send({status:false, message:"can't update"}) 
    }
    catch(err){
        return res.status(400).send({status:false, message: 'unknown error occured', error: err.message});
    }
}

const updateSubject = async (req, res) => {
    try {
      const {classId, id} = req.params;
      const { subjectName } = req.body;
      console.log(req.body)
      let query = `UPDATE "Subjects" SET "subjectName"=:subjectName, "updatedAt"= now() WHERE "classId"=:classId AND "id" = :id  AND "deletedAt" IS null`;
      const results = await db.sequelize.query(query, {
        replacements: { subjectName, classId, id},
        type: QueryTypes.UPDATE
      });
      return results.length
        ? res.status(200).send({ status: true, message: "updated successfully" })
        : res.status(400).send({ status: false, message: "can't update" });
    } catch (err) {
      return res
        .status(400)
        .send({ status: false, message: 'unknown error occurred', error: err.message });
    }
  };
  

const deleteSubject = async (req, res)=> {
    try{
        const {id}= req.params;
        let query = `UPDATE "Subjects" SET "deletedAt" = now() WHERE "deletedAt" IS NULL AND id = :id`;
        const results = await db.sequelize.query(query, {
            replacements: { id },
        });
        return results ? res.status(200).send({status:true, message: "successfully removed"}) : res.status(400).send({status:false, message: "unable to remove"})   
    }
    catch(err){
        return res.status(400).send({status:false, message: 'unknown error occured', error: err.message});
    }
}

module.exports = {addSubject, getSubjects, updateMarks, deleteSubject, updateSubject}