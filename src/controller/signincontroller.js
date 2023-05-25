const db = require('../../models/index') 
const jwt = require('jsonwebtoken')
require('dotenv').config()


const studentLogin = async function (req, res) {
    try {
//=======creating Token by Jwt.sign Function
     const student = await db.Students.findOne({where:{ email:req.body.email}})
        if (!student) {
            return res.status(404).send({ status: false, message: "First register youself then sign in again !!" })
        }
       
        return res.status(200).send({ status: true, message: "Success", data:jwt.sign({                                   
            id: student.toJSON().id ,}, process.env.PRIVATE_KEY , { expiresIn: '1h' }) })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = {studentLogin}