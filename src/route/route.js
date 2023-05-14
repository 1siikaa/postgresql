// ------------------------------------------------------------------- imports --------------------------------------------------
const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentcontroller.js')
const {Student} = require('../model/studentModel');
const {checkIfStudentAlreadyExists, validateStudent} = require('../middleware/studentValidation.js')
// ------------------------------------------------------------------- routing starts -------------------------------------------
router.get('/getAllStudents', studentController.getStudents);
router.get('/getAStudent/:id', studentController.getStudentById);
router.post('/addStudent', validateStudent, checkIfStudentAlreadyExists, studentController.addStudent);
router.put('/udateStudent/:id', validateStudent, studentController.updateStudent);
router.delete('/deleteStudent',  studentController.deleteStudent);
router.delete('/deleteAllStudent', studentController.deleteAllStudent);
router.get('/getStudentList', studentController.fetchStudentList);


// -------------------------------------------------------------------------- exports --------------------------------------------
module.exports = router;

