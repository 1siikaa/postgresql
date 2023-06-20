const db = require('../../models/index')
const {QueryTypes} = require('sequelize')

// adding marks of a student 
const addAdmin = async (req, res) => {
    try{
      const {name, email,  classId} = req.body;
      let query = `INSERT INTO "Admin" ("name", "email", "classId") VALUES (:name, :email, :classId)`;
      const results = await db.sequelize.query(query, {
          type: QueryTypes.INSERT,
          replacements: { name, email,  classId },
          plain: false,
      });
      return results.length ? res.status(201).send({status:true, message: "added successfully."}): res.status(400).send({status:false, message:'failed to insert'})
      }
    catch (err) {
      return res.status(400).send({status: false,message: "unknown error occured", error: err.message});
    }
  };

  const getAdmin = async (req, res)=> {
    try{
        const {id}= req.params
     let query = `SELECT name FROM "Admin"  WHERE id = :id AND "deletedAt" IS NULL`
     const results = await db.sequelize.query(query, {
        type: QueryTypes.SELECT,
        replacements: { id },
        plain: false,
    });
    return results.length ? res.status(200).send({status:true, data: results}): res.status(404).send({status:false, message:'not found'})
    }
    catch (err) {
        return res.status(400).send({status: false,message: "unknown error occured"});
      }
  }

  module.exports = {
    addAdmin, getAdmin
  }