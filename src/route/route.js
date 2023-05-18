// ------------------------------------------------------------------- imports --------------------------------------------------
const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentcontroller.js');
const classController = require('../controller/classcontroller.js');
const {checkIfStudentAlreadyExists, validateStudent, studentNotFound} = require('../middleware/studentvalidation.js');
// ------------------------------------------------------------------- routing starts -------------------------------------------

// get requests ---------------------------------------------------------------------------------------------------------------------
router.get('/getAllStudents', studentController.getStudents);

router.get('/getAStudent/:id', studentController.getStudentById);

router.get('/getStudentList', studentController.fetchStudentList);

router.get('/getClasses', classController.getClassDetails);

// post requests --------------------------------------------------------------------------------------------------------------------
router.post('/addStudent', validateStudent, checkIfStudentAlreadyExists, studentController.addStudent);

router.post('/addClass', classController.addClass);

// put requests ------------------------------------------------------------------------------------------------
router.put('/udateStudent/:id', validateStudent, studentNotFound, studentController.updateStudent);

// delete requests --------------------------------------------------------------------------------------------------------------------
router.delete('/deleteStudent/:id', studentNotFound, studentController.deleteStudent);



// -------------------------------------------------------------------------- exports --------------------------------------------
module.exports = router;