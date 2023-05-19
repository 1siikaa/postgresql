require('dotenv').config();
const express = require("express");
const app = express();
const route = require('./src/route/route.js');

// content-type : application/json
app.use(express.json());

  
// Middleware to handle errors (global level middleware)
app.use((err, req, res, next) => {
    // Log the error
    console.error(err);
    return res.status(500).send({status:false, error: 'Internal Server Error', message:err.message, name: err.name});
  });



app.use('/', route);
// starting server
app.listen(process.env.PORT, ()=>{
    console.log(`Express Application is running at port ${process.env.PORT}`);
})