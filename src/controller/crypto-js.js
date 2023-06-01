const CryptoJS = require('crypto-js');


const messageEncryDecry = async(req, res)=> {
    try{
const message = req.body.message;
const secretKey = 'mySecretKey123';

// Encrypt
const encryptedMessage = CryptoJS.AES.encrypt(message, secretKey).toString();
const obj = {}
obj.encryptedMessage = encryptedMessage;



// Decrypt
const bytes = CryptoJS.AES.decrypt(encryptedMessage, secretKey);
console.log(bytes);
const decryptedMessage = bytes.toString(CryptoJS.enc.Utf8);
obj.decryptedMessage = decryptedMessage;
return res.status(200).send({status:true, data:obj})
    }
    catch(err){
        return res.status(500).send({status:false, message:err.message});
    }
}
module.exports = {messageEncryDecry}
