// ------------------------------------------------------------------- imports --------------------------------------------------
const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentcontroller.js')

// ------------------------------------------------------------------- routing starts -------------------------------------------
router.get('/getAllStudents', studentController.getStudents);




// -------------------------------------------------------------------------- exports --------------------------------------------
module.exports = router;

