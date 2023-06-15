const db = require('../../models/index')

// adding a class
const addClass = async(req, res) => {
    try {
      await db.Classes.create({totalStudents:0});
      return res.status(201).send({status:true, message: "Class added successfully" });
      
    } catch (err) {
      return res.status(400).send({status:false, message: "unknown error occured" });
    }
  };

// getting class details
  const getClassDetails = async(req, res) => {
    try {
        const Classes = await db.Classes.findAll({
          include: [{ model: db.Students, as:'students' }] 
        });
            return Classes.length===0 ? res.status(404).send({ message: "No Classes found." }): res.status(200).send({status:true, data:Classes});
        
      } catch (err) {
        return res.status(400).send({status:false, message: "unknown error occured" });
      }
  }

  // getting a class detail
  const getClass = async(req, res) => {
    try {
     
        const specificClass = await db.Classes.findOne({where:{id: req.params.id}, 
          include: [{ model: db.Students, as:'students' }]
        });
            return !specificClass ? res.status(404).send({status:false, message: "No Class found." }) : res.status(200).send({status:true, data:specificClass});
            
      } catch (err) {
        return res.status(400).send({status:false, message: "unknown error occured" });
      }
  }

  const deleteAClass = async (req, res) => {
      try {
     return await db.Classes.destroy(
          { where: { id: req.params.id } }
        ) ? 
        res.status(200).send({status:true, message: "Class deleted successfully" }) :
        res.status(404).send({status: false, message:'not found'});
      } catch (err) {
        return res.status(400).send({status:false,  message: 'unknown error occured' });
      }
    };
  
  
  module.exports = {addClass, getClassDetails, getClass, deleteAClass}

