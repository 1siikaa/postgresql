require('dotenv').config();
const express = require("express");
const app = express();
const route = require('./src/route/route.js');
const multer= require("multer");

app.use( multer().any())
// content-type : application/json
app.use(express.json());

app.use('/', route);

// starting server
app.listen(process.env.PORT, ()=>{
    console.log(`Express Application is running at port ${process.env.PORT}`);
})

app.use((err, req, res, next) => {
    // Log the error
    console.error(err);
    return res.status(500).send({status:false, error: 'Internal Server Error', message:err.message, name: err.name});
  });
