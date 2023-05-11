require('dotenv').config();
const express = require("express");
const app = express();
const route = require('./src/route/route.js');
app.use(express.json());
app.use('/', route);

app.listen(process.env.PORT, ()=>{
    console.log(`Express Application is running at port ${process.env.PORT}`);
})