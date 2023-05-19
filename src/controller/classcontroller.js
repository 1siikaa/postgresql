const sequelize = require('../../db')
const { Sequelize, Op } = require("sequelize");
const Class = require('../../models/class')(sequelize, Sequelize);



const addClass = async(req, res) => {
    try {
      const classes = await Class.findAll();
      if(classes.length>12){
      return res.status(400).send({ status:false, message: "classes can be 1 to 12 only." });
      }
      await Class.create({totalStudents:0});
      return res.status(201).send({status:true, message: "Class added successfully" });
      
    } catch (err) {
      return res.status(500).send({status:false, message: err.message });
    }
  };


  const getClassDetails = async(req, res) => {
    try {
        const classes = await Class.findAll();
            if(classes.length===0){
            return res.status(404).send({ message: "No classes found." });
            }
          return res.status(200).send({status:true, data:classes});
        
      } catch (err) {
        return res.status(500).send({status:false, message: err.message });
      }
  }

  const getClass = async(req, res) => {
    try {
     
        const specificClass = await Class.findOne({where:{id: req.params.id}});
            if(!specificClass){
            return res.status(404).send({status:false, message: "No class found." });
            }
          return res.status(200).send({status:true, data:specificClass});
        
      } catch (err) {
        return res.status(500).send({status:false, message: err.message });
      }
  }
  
  module.exports = {addClass, getClassDetails, getClass}

