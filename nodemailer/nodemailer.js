var nodemailer = require('nodemailer');
require('dotenv').config()

// Create the transporter with the required configuration for Outlook
// change the user and pass !
var transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
       ciphers:'SSLv3'
    },
    auth: {
        user: process.env.USERS,
        pass: process.env.PASS
    }
});

// setup e-mail data, even with unicode symbols
var mailOptions = {
    from: `Importanat Details ${process.env.USERS}`, // sender address (who sends)
    to: 'vanshikaadubeydigitest@yopmail.com', // list of receivers (who receives)
    subject: 'Sending it first time', // Subject line
    text: 'Nodemailer', // plaintext body
    html: '<b>Hello world </b><br> This is the first email sent with Nodemailer in Node.js' // html body
};
console.log(mailOptions)

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }

    console.log('Message sent: ' + info.response);
});
