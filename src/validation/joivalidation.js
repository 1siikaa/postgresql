const joi = require("joi");

module.exports = {
  StudentModel: joi.object({
    name: joi
      .string()
      .required()
      .messages({ "any only": "please provide valid name." })
      .regex(/^[a-z ,.'-]+$/i),
    age: joi.number().min(0).max(100).required().messages({ "any only": "please provide valid age." }),
    classId: joi.number().min(1).required().messages({ "any only": "please provide valid classId." }),
    email: joi
      .string()
      .required()
      .messages({ "any only": "please provide valid email." })
      .regex(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
     ,
    Pincode: joi.string().required(),
    dob: joi
      .string()
      .required()
      .messages({ "any only": "please provide valid date." })
      .regex(/^\d{4}\/\d{2}\/\d{2}$/),
  }),

  updatevalidation: joi.object({
    name: joi
      .string()
      .messages({ "any only": "please provide valid name." })
      .regex(/^[a-z ,.'-]+$/i),
    age: joi.number().min(0).max(100).messages({ "any only": "please provide valid age." }), 
    classId: joi.number().min(1).messages({ "any only": "please provide valid classId." }),
    email: joi
      .string()
      .messages({ "any only": "please provide valid email." })
      .regex(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
     ,
    dob: joi
      .string()
      .messages({ "any only": "please provide valid date." })
      .regex(/^\d{4}\/\d{2}\/\d{2}$/),
  }),

  paramsValidation: joi.object({
    id: joi.number()
  }),

  loginValidation :joi.object({
    email: joi
      .string()
      .required()
      .messages({ "any only": "please provide valid email." })
      .regex(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  }),
  markValidation : joi.object({
    id: joi.number(),
    marks : joi.number().min(0).max(100).required(),
    studentId: joi.number().min(1).required(),
    subjectId: joi.number().min(1).required(),
    classId: joi.number().min(1).required(),
  }),
  subjectValidation : joi.object({
    id: joi.number(),
    subjectName: joi.string().required(),
    classId: joi.number().min(1).required(),
    totalMarks: joi.number()
  }),
  markUpdateValidation : joi.object({
    marks : joi.number().min(0).max(100),
    studentId: joi.number().min(1),
    subjectId: joi.number().min(1),
    classId: joi.number().min(1)
  }),
  subjectUpdateValidation : joi.object({
    subjectName: joi.string(),
    classId: joi.number().min(1),
  })
};