const jwt = require("jsonwebtoken")
require('dotenv').config();


//================================================Authentication======================================================//

const authentication = function (req, res, next) {
    try {
        return !req.headers["authorization"] ?
            res.status(400).send({ status: false, message: "token must be present in headers" })
        :
            jwt.verify(req.headers["authorization"], process.env.PRIVATE_KEY , function (err, decodedToken) {
            if(err){return res.status(401).send({ status: false, message: "forbidden" })}
            else{
           return (Number(req.params.id) === decodedToken.id ) ?
            next() : res.status(403).send({ status: false, message: "unauthorized access" })
         }})
}
    catch (error) {
        return res.status(400).send({ status: false, message:"unknown error occured" })}}



//===============================================authorisation====================================================//




module.exports.authentication = authentication
