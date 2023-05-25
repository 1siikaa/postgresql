// ------------------------------------------------------------------- imports --------------------------------------------------
const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentcontroller.js');
const classController = require('../controller/classcontroller.js');
const {checkIfStudentAlreadyExists, studentNotFound} = require('../middleware/studentvalidation.js');
const {authentication, authorization} = require('../middleware/auth.js')
const {studentLogin} = require('../controller/signincontroller.js')
const {studentvalidation, updatevalidation, paramsValidation, loginValidation} = require('../middleware/joiValidationMiddleware.js')
// ------------------------------------------------------------------- routing starts -------------------------------------------

// get requests ---------------------------------------------------------------------------------------------------------------------
router.get('/getAllStudents', studentController.getStudents);

router.get('/getAStudent/:id', paramsValidation, studentController.getStudentById);

router.get('/getStudentList', studentController.fetchStudentList);

router.get('/getClasses', classController.getClassDetails);

router.get('/getClass/:id', paramsValidation,  classController.getClass);

// post requests --------------------------------------------------------------------------------------------------------------------
router.post('/addStudent', studentvalidation, checkIfStudentAlreadyExists,   studentController.addStudent);

router.post('/login', loginValidation, studentLogin)

router.post('/addClass', classController.addClass);

// put requests ------------------------------------------------------------------------------------------------
router.put('/udateStudent/:id',  paramsValidation, updatevalidation, authentication, studentNotFound, studentController.updateStudent);

// delete requests --------------------------------------------------------------------------------------------------------------------
router.delete('/deleteStudent/:id',  paramsValidation,  authentication,  studentNotFound, studentController.deleteStudent);


// -------------------------------------------------------------------- route not found --------------------------------------------------------------

router.all('/*', (req, res) => {
    return res.status(404).json({
        message: 'Page not found'
    });
});



// -------------------------------------------------------------------------- exports --------------------------------------------
module.exports = router;