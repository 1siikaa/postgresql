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
  }
};