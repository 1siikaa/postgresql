const db = require('../../models/index') 
const jwt = require('jsonwebtoken')
require('dotenv').config()
const {QueryTypes} = require('sequelize')


const studentLogin = async function (req, res) {
    try {
//=======creating Token by Jwt.sign Function
     const student = await db.Students.findOne({where:{ email:req.body.email}})
     process.user = "Students"
     return student ? res.status(200).send({ status: true, message: "Success", data:jwt.sign({                                   
        id: student.toJSON().id, user:"Students" }, process.env.PRIVATE_KEY , { expiresIn: '1h' }) }):res.status(404).send({ status: false, message: "First register youself then sign in again !!" })
}
    catch (error) {
        return res.status(500).send({ status: false, message : "unknown error occured" })
    }
}


const adminLogin = async function (req, res) {
    try {
        const {email , classId} = req.body
        const query = `SELECT "isAdmin", id FROM "Admin" WHERE email = :email AND "classId" = :classId AND "deletedAt" IS NULL`;
        const isAdmin = await db.sequelize.query(query, {
            type: QueryTypes.SELECT,
            plain : false,
            replacements : {email, classId}
        })
        process.user = "Admin"
      return isAdmin.length ? res.status(200).send({ status: true, message: "Success", data:jwt.sign({                                   
        id: isAdmin[0].id , isAdmin : isAdmin[0].isAdmin, user:"Admin"}, process.env.PRIVATE_KEY , { expiresIn: '1h' }) }):res.status(404).send({ status: false, message: "First register as a admin youself then sign in again !!" })
}
    catch (error) {
        return res.status(500).send({ status: false, message : "unknown error occured" , message: error.message})
    }
}
module.exports = {studentLogin, adminLogin}