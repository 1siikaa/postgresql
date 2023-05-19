const joi = require("joi");

module.exports = {
  StudentModel: joi.object({
    name: joi
      .string()
      .required()
      .messages({ "any only": "please provide valid name." })
      .regex(/^[a-z ,.'-]+$/i),
    age: joi.number().required().messages({ "any only": "please provide valid age." }),
    classId: joi.number().required().messages({ "any only": "please provide valid classId." }),
    email: joi
      .string()
      .required()
      .messages({ "any only": "please provide valid email." })
      .regex(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
     ,
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
    age: joi.number().messages({ "any only": "please provide valid age." }),
    classId: joi.number().messages({ "any only": "please provide valid classId." }),
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
      
  })
 


};