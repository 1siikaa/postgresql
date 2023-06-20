var nodemailer = require('nodemailer');
require('dotenv').config()


async function send365Email(password, from, to, subject, html, text) {
    try { 
        const transportOptions = {
            host: 'smtp.office365.com',
            port: '587',
            auth: { user: from, pass: password },
            secureConnection: true,
            tls: { ciphers: 'SSLv3' }
        };
    
        const mailTransport = nodemailer.createTransport(transportOptions);
    
        let result = await mailTransport.sendMail({
            from,
            to,
            replyTo: from,
            subject,
            html,
            text
        });
        return result ? true : false;
    } catch (err) { 
        console.error(`send365Email: An error occurred:`, err);
    }
}
const mailing = async(req, res) => {
try{
let response = send365Email(req.body.password, req.body.from, req.body.to, req.body.subject, req.body.html, req.body.text)
return response ? res.status(200).send({status:true, message: "message sent successfully"}): res.status(400).send({status:false, message: "can't send some error occured"})
}
catch(err){
    return res.status(400).send({status:false, message: "some unknown error occured." })
}
}

module.exports = {
    mailing
}

