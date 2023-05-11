// ------------------------------------------------------------------- imports --------------------------------------------------
const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentcontroller.js')

// ------------------------------------------------------------------- routing starts -------------------------------------------
router.get('/getAllStudents', studentController.getStudents);
router.get('/getAStudent/:id', studentController.getStudentById);

router.post('/addStudent', studentController.addStudent);





// -------------------------------------------------------------------------- exports --------------------------------------------
module.exports = router;

