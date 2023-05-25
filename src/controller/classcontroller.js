const db = require('../../models/index')


const addClass = async(req, res) => {
    try {
      const Classes = await db.Classes.findAll({where: {deletedAt : null}});
      if(Classes.length>12){
      return res.status(400).send({ status:false, message: "Classes can be 1 to 12 only." });
      }
      await db.Classes.create({totalStudents:0});
      return res.status(201).send({status:true, message: "Class added successfully" });
      
    } catch (err) {
      return res.status(500).send({status:false, message: err.message });
    }
  };


  const getClassDetails = async(req, res) => {
    try {
        const Classes = await db.Classes.findAll({
          where: {deletedAt : null},
          include: [{ model: db.Students, as:'students' }] 
        });
            if(Classes.length===0){
            return res.status(404).send({ message: "No Classes found." });
            }
          return res.status(200).send({status:true, data:Classes});
        
      } catch (err) {
        return res.status(500).send({status:false, message: err.message });
      }
  }

  const getClass = async(req, res) => {
    try {
     
        const specificClass = await db.Classes.findOne({where:{id: req.params.id, deletedAt : null}, 
          include: [{ model: db.Students, as:'students' }]
        });
            if(!specificClass){
            return res.status(404).send({status:false, message: "No Class found." });
            }
          return res.status(200).send({status:true, data:specificClass});
        
      } catch (err) {
        return res.status(500).send({status:false, message: err.message });
      }
  }
  
  module.exports = {addClass, getClassDetails, getClass}

