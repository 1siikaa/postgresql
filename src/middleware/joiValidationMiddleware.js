const validation = require("../validation/joivalidation");

module.exports = {
  studentvalidation: (req, res, next) => {
    const { error } = validation.StudentModel.validate(req.body);
    if (error) {
      return res.status(400).send({ status: false, message: error.message });
    } else next();
  },

  updatevalidation: (req, res, next) => {
    const { error } = validation.updatevalidation.validate(req.body);
    if (error) {
      return res.status(400).send({ status: false, message: error.message });
    } else next();
  },

  paramsValidation : (req, res, next) => {
    const { error } = validation.paramsValidation.validate(req.params);
    if (error) {
      return res.status(400).send({ status: false, message: error.message });
    } else next();
  },
  loginValidation : (req, res, next) => {
    const { error } = validation.loginValidation.validate(req.body);
    if (error) {
      return res.status(400).send({ status: false, message: error.message });
    } else next();
  },
  classValidation : (req, res, next) => {
    const { error } = validation.classValidation.validate(req.body);
    if (error) {
      return res.status(400).send({ status: false, message: error.message });
    } else next(); 
  },
  markValidation : (req, res, next) => {
    const { error } = validation.markValidation.validate(req.body);
    if (error) {
      return res.status(400).send({ status: false, message: error.message });
    } else next();   
  },
  subjectValidation : (req, res, next) => {
    const { error } = validation.subjectValidation.validate(req.body);
    if (error) {
      return res.status(400).send({ status: false, message: error.message });
    } else next();
  },
  markUpdateValidation : (req, res, next) => { 
    const { error } = validation.markUpdateValidation.validate(req.body);
    if (error) {
      return res.status(400).send({ status: false, message: error.message });
    } else next();
  },
  subjectUpdateValidation : (req, res, next)=> {
    const { error } = validation.subjectUpdateValidation.validate(req.body);
    if (error) {
      return res.status(400).send({ status: false, message: error.message });
    } else next();
  }
};