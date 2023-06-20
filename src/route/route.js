// ------------------------------------------------------------------- imports --------------------------------------------------
const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentcontroller.js');
const classController = require('../controller/classcontroller.js');
const fetchPincode = require('../controller/externalApi.js')
const {checkIfStudentAlreadyExists, studentNotFound} = require('../middleware/studentValidation.js');
const { authAdmin, authUser, } = require('../middleware/auth.js')
const {studentLogin, adminLogin} = require('../controller/signincontroller.js')
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
const { isAdminOrStudent, isAdmin, checkIfAdminAlreadyExists } = require('../middleware/adminValidation.js');
const { addAdmin, getAdmin } = require('../controller/admincontroller.js');

// ------------------------------------------------------------------- routing starts -------------------------------------------

// get requests ---------------------------------------------------------------------------------------------------------------------
router.get('/getAllStudents',  isAdminOrStudent, studentController.getStudents);

router.get('/getAStudent/:id',   paramsValidation, authUser, isAdminOrStudent, studentController.getStudentById);

router.get('/getStudentList',  isAdminOrStudent, studentController.fetchStudentList);

router.get('/getClasses',  isAdminOrStudent, classController.getClassDetails);

router.get('/getClass/:id',   paramsValidation,  isAdmin,  classController.getClass);

router.get('/getAdmin/:id', authAdmin, isAdmin, getAdmin)

router.get('/fetchPincode/:pincode' ,  fetchPincode.fetchPincode);

router.get('/encdec', messageEncryDecry);

router.get('/password', usingBcrypt);

router.get('/uselambda', lambdaFunction);

router.get('/getMarks', isAdminOrStudent, getMarks)

router.get('/getSubjects', isAdminOrStudent, getSubjects)

router.get('/getTotalMarks', isAdminOrStudent, getTotalMarks)

router.get('/getTotalPercentage',  getTotalParcentage)

router.get('/getTopper', isAdminOrStudent, getAllToppers)

router.get('/getAverageMarksInAClass',  isAdminOrStudent, getAverageMarksOfAClass)

// post requests --------------------------------------------------------------------------------------------------------------------
router.post('/addStudent', studentvalidation,  isAdmin,   checkIfStudentAlreadyExists, studentController.addStudent);

router.post('/addAdmin', checkIfAdminAlreadyExists,  addAdmin )

router.post('/login', loginValidation, studentLogin)

router.post ('/adminSignIn', adminLogin)

router.post('/addClass', classValidation,  isAdmin, classController.addClass);

router.post("/write-file-aws", uploadingFiles)

router.post('/addSubject', subjectValidation,  isAdmin,   checkIfSubjectAlreadyExists, addSubject)

router.post('/addMark', markValidation,  isAdmin,  checkIfMarkAlreadyExists, addMarks)

router.post('/mailing', mailing)

// put requests ------------------------------------------------------------------------------------------------
router.put('/udateStudent/:id',  paramsValidation, updatevalidation,  authUser , isAdmin,   studentNotFound, studentController.updateStudent);

router.put('/updateMarks/:id', paramsValidation, markUpdateValidation, authUser , isAdmin,  updateMarks)

router.put('/updateSubject/:classId/:id',  subjectUpdateValidation, authUser , isAdmin,  updateSubject)

// delete requests --------------------------------------------------------------------------------------------------------------------
router.delete('/deleteStudent/:id',  paramsValidation, authUser , isAdmin,  studentNotFound, studentController.deleteStudent);

router.delete('/deleteSubject/:id', paramsValidation, authUser , isAdmin, deleteSubject)

router.delete('/deleteMarks/:id', paramsValidation, authUser , isAdmin, deleteMarks)

router.delete('/deleteAClass/:id', paramsValidation, authUser , isAdmin, classController.deleteAClass)
// -------------------------------------------------------------------- route not found --------------------------------------------------------------

router.all('/*', (req, res) => {
    return res.status(404).json({
        message: 'Page not found'
    });
});

// -------------------------------------------------------------------------- exports --------------------------------------------
module.exports = router;