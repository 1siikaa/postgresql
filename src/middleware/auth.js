const jwt = require("jsonwebtoken")
require('dotenv').config();


//================================================Authentication======================================================//

const authentication = function (req, res, next) {
    try {
        if (!req.headers["x-api-key"]) {
            return res.status(400).send({ status: false, message: "token must be present in headers" })
        }
        else {
            jwt.verify(req.headers["x-api-key"], process.env.PRIVATE_KEY , function (err, decodedToken) {
            if(err){return res.status(401).send({ status: false, name:err.name, message: err.message })}
            else{
           req.loginUserId = decodedToken.id   
            next()}})}
}
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })}}



//===============================================authorisation====================================================//

const authorization = async function (req, res, next) {
    try { 
            if (req.loginUserId != req.params.id) { 
            return res.status(403).send({ status: false, message: "You are not authorised to perform this activity" }) 
    }
        next();
    }
    catch (error) {
        return res.status(500).send({status:false, message: error.message })
    }
}



module.exports.authentication = authentication
module.exports.authorization = authorization