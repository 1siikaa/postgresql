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
  }
};