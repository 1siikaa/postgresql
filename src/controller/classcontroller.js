const sequelize = require('../../db')
const { Sequelize, Op } = require("sequelize");
const Class = require('../../models/class')(sequelize, Sequelize);
const {validateClassId} = require('../validation/validatingStudent')


const addClass = async(req, res) => {
    try {
      const classes = await Class.findAll();
      if(classes.length>12){
      return res.status(400).send({ message: "classes can be 1 to 12 only." });
      }
      await Class.create({totalStudents:0});
      return res.status(201).send({ message: "Class added successfully" });
      
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  };


  const getClassDetails = async(req, res) => {
    try {
        const classes = await Class.findAll();
            if(classes.length===0){
            return res.status(404).send({ message: "No classes found." });
            }
          return res.status(200).json(classes);
        
      } catch (err) {
        return res.status(500).send({ message: err.message });
      }
  }

  const getClass = async(req, res) => {
    try {
      if(validateClassId(req.params.id)){
        return res.status(400).send({ status:false, message: "classId is not valid."});
       }
        const specificClass = await Class.findOne({where:{id: req.params.id}});
            if(!specificClass){
            return res.status(404).send({ message: "No class found. Please enter a valid class Id." });
            }
          return res.status(200).json(specificClass);
        
      } catch (err) {
        return res.status(500).send({ message: err.message });
      }
  }
  
  module.exports = {addClass, getClassDetails, getClass}

