// ------------------------------------------------------------------- imports --------------------------------------------------
const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentcontroller.js');
const classController = require('../controller/classcontroller.js');
const {checkIfStudentAlreadyExists, studentNotFound} = require('../middleware/studentvalidation.js');
const {studentvalidation, updatevalidation} = require('../middleware/joiValidationMiddleware.js')
// ------------------------------------------------------------------- routing starts -------------------------------------------

// get requests ---------------------------------------------------------------------------------------------------------------------
router.get('/getAllStudents', studentController.getStudents);

router.get('/getAStudent/:id', studentController.getStudentById);

router.get('/getStudentList', studentController.fetchStudentList);

router.get('/getClasses', classController.getClassDetails);

router.get('/getClass/:id',  classController.getClass);

// post requests --------------------------------------------------------------------------------------------------------------------
router.post('/addStudent', studentvalidation, checkIfStudentAlreadyExists, studentController.addStudent);

router.post('/addClass', classController.addClass);

// put requests ------------------------------------------------------------------------------------------------
router.put('/udateStudent/:id',studentNotFound, updatevalidation, studentController.updateStudent);

// delete requests --------------------------------------------------------------------------------------------------------------------
router.delete('/deleteStudent/:id', studentNotFound, studentController.deleteStudent);



// -------------------------------------------------------------------------- exports --------------------------------------------
module.exports = router;