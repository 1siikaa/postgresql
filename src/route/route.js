// ------------------------------------------------------------------- imports --------------------------------------------------
const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentcontroller.js');
const {checkIfStudentAlreadyExists, validateStudent, studentNotFound} = require('../middleware/studentvalidation.js');
// ------------------------------------------------------------------- routing starts -------------------------------------------

// get requests ---------------------------------------------------------------------------------------------------------------------
router.get('/getAllStudents', studentController.getStudents);

router.get('/getAStudent/:id', studentController.getStudentById);

router.get('/getStudentList', studentController.fetchStudentList);

// post requests --------------------------------------------------------------------------------------------------------------------
router.post('/addStudent', validateStudent, checkIfStudentAlreadyExists, studentController.addStudent);

// put requests ------------------------------------------------------------------------------------------------
router.put('/udateStudent/:id', validateStudent, studentNotFound, studentController.updateStudent);

// delete requests --------------------------------------------------------------------------------------------------------------------
router.delete('/deleteStudent/:id', studentNotFound, studentController.deleteStudent);

router.delete('/deleteAllStudent', studentController.deleteAllStudent);


// -------------------------------------------------------------------------- exports --------------------------------------------
module.exports = router;