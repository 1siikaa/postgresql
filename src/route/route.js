// ------------------------------------------------------------------- imports --------------------------------------------------
const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentcontroller.js');
const classController = require('../controller/classcontroller.js');
const fetchPincode = require('../controller/externalApi.js')
const {checkIfStudentAlreadyExists, studentNotFound} = require('../middleware/studentValidation.js');
const {authentication} = require('../middleware/auth.js')
const {studentLogin} = require('../controller/signincontroller.js')
const {studentvalidation, updatevalidation, paramsValidation, loginValidation, markValidation, subjectValidation, markUpdateValidation, subjectUpdateValidation, classValidation} = require('../middleware/joiValidationMiddleware.js')
const {messageEncryDecry} = require('../controller/crypto-js.js')
const {uploadingFiles} = require('../controller/aws.-s3.js')
const {usingBcrypt} = require('../controller/bcrypt.js');
const { lambdaFunction } = require('../controller/aws-lamda.js');
const { addSubject, getSubjects, updateMarks, deleteSubject, updateSubject } = require('../controller/subjectController.js');
const { addMarks, getMarks, getTotalMarks, getTotalParcentage, getAllToppers, getAverageMarksOfAClass, deleteMarks } = require('../controller/markController.js');
const { checkIfSubjectAlreadyExists } = require('../middleware/subjectValidation.js');
const { checkIfMarkAlreadyExists } = require('../middleware/markValidation.js');
const { mailing } = require('../../nodemailer/nodemailer.js');



// ------------------------------------------------------------------- routing starts -------------------------------------------

// get requests ---------------------------------------------------------------------------------------------------------------------
router.get('/getAllStudents', studentController.getStudents);

router.get('/getAStudent/:id', paramsValidation, studentController.getStudentById);

router.get('/getStudentList', studentController.fetchStudentList);

router.get('/getClasses', classController.getClassDetails);

router.get('/getClass/:id', paramsValidation,  classController.getClass);

router.get('/fetchPincode/:pincode' , fetchPincode.fetchPincode);

router.get('/encdec', messageEncryDecry);

router.get('/password', usingBcrypt);

router.get('/uselambda', lambdaFunction);

router.get('/getMarks', getMarks)

router.get('/getSubjects', getSubjects)

router.get('/getTotalMarks', getTotalMarks)

router.get('/getTotalPercentage', getTotalParcentage)

router.get('/getTopper', getAllToppers)

router.get('/getAverageMarksInAClass', getAverageMarksOfAClass)

// post requests --------------------------------------------------------------------------------------------------------------------
router.post('/addStudent', studentvalidation, checkIfStudentAlreadyExists,   studentController.addStudent);

router.post('/login', loginValidation, studentLogin)

router.post('/addClass', classValidation, classController.addClass);

router.post("/write-file-aws", uploadingFiles)

router.post('/addSubject', subjectValidation,  checkIfSubjectAlreadyExists, addSubject)

router.post('/addMark', markValidation, checkIfMarkAlreadyExists, addMarks)

router.post('/mailing', mailing)

// put requests ------------------------------------------------------------------------------------------------
router.put('/udateStudent/:id',  paramsValidation, updatevalidation, authentication, studentNotFound, studentController.updateStudent);

router.put('/updateMarks/:id', paramsValidation, markUpdateValidation,   updateMarks)

router.put('/updateSubject/:classId/:id', subjectUpdateValidation, updateSubject)

// delete requests --------------------------------------------------------------------------------------------------------------------
router.delete('/deleteStudent/:id',  paramsValidation,  authentication,  studentNotFound, studentController.deleteStudent);

router.delete('/deleteSubject/:id', paramsValidation, deleteSubject)

router.delete('/deleteMarks/:id', paramsValidation, deleteMarks)

router.delete('/deleteAClass/:id', paramsValidation, classController.deleteAClass)
// -------------------------------------------------------------------- route not found --------------------------------------------------------------

router.all('/*', (req, res) => {
    return res.status(404).json({
        message: 'Page not found'
    });
});



// -------------------------------------------------------------------------- exports --------------------------------------------
module.exports = router;