const jwt = require("jsonwebtoken")
require('dotenv').config();


//================================================Authentication======================================================//

const authentication = function (req, res, next) {
    try {
        if (!req.headers["authorization"]) {
            return res.status(400).send({ status: false, message: "token must be present in headers" })
        }
        else {
            jwt.verify(req.headers["authorization"], process.env.PRIVATE_KEY , function (err, decodedToken) {
            if(err){return res.status(401).send({ status: false, message: "forbidden" })}
            else{
           if(Number(req.params.id) === decodedToken.id ){
            next()
           }
           else{
            return res.status(403).send({ status: false, message: "unauthorized access" })
           }
         }})}
}
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })}}



//===============================================authorisation====================================================//




module.exports.authentication = authentication
