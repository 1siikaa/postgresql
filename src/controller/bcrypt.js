const bcrypt = require('bcrypt')
// encrypting the password
const usingBcrypt = async(req,res) => {
    try{
        const obj = {}
        obj.initialPassword = req.body.password
req.body.password=await bcrypt.hash(req.body.password,1 )
       obj.newPassword = req.body.password
        console.log(obj)

const matchedpassword =await bcrypt.compare(obj.initialPassword, obj.newPassword)
console.log(matchedpassword)
        if (!matchedpassword) {return res.status(404).send({ status: false, message: "Password is not valid." })}
        obj.matchedpassword = matchedpassword
        return res.status(200).send({ status: true, data : obj })
    }
    catch(err){
        return res.status(500).send({ status:false, message: err.message})
    }

}

module.exports = {usingBcrypt}
        