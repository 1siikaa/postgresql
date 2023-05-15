// ------------------------------ imports -------------------------------------------------------------------------
require('dotenv').config();
const express = require("express");
const app = express();
const route = require('./src/route/route.js');

// content-type : application/json
app.use(express.json());

app.use('/', route);

// starting server
app.listen(process.env.PORT, ()=>{
    console.log(`Express Application is running at port ${process.env.PORT}`);
})