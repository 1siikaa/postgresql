const sequelize = require('../../db')
const { Sequelize, Op } = require("sequelize");
const Student = require('../../models/student')(sequelize, Sequelize);
const jwt = require('jsonwebtoken')


const studentLogin = async function (req, res) {
    try {
//=======create Token by Jwt.sign Function
     const student = await Student.findOne({ email:req.body.email})
        if (!student) {
            return res.status(404).send({ status: false, message: "First register youself then sign in again !!" })
        }
        return res.status(200).send({ status: true, message: "Success", data:jwt.sign({                                   
            id: student.id ,}, "studentsData", { expiresIn: '1h' }) })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = {studentLogin}