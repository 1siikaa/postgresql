const db = require("../../models/index");
const { QueryTypes } = require("sequelize");


// adding marks of a student 
const addMarks = async (req, res) => {
  try{
    const {marks, subjectId, studentId, classId} = req.body;
    let query = `INSERT INTO "Marks" ("marks", "subjectId", "studentId", "classId") VALUES (:marks, :subjectId, :studentId, :classId)`;
    const results = await db.sequelize.query(query, {
        type: QueryTypes.INSERT,
        replacements: { marks, subjectId, studentId, classId },
        plain: false,
    });
    return res.status(201).send({status:true, message: "added successfully."})
    }
  catch (err) {
    return res.status(400).send({status: false,message: "unknown error occured", error: err.message });
  }
};

// fetching students marks
const getMarks = async (req, res) => {
  try {
    let query = `SELECT "Marks".marks, "Marks"."studentId",  "Students".name, "Subjects"."subjectName", "Marks"."subjectId",
        "Subjects"."classId" FROM "Marks"
        INNER JOIN "Students" ON "Marks"."studentId" = "Students".id
        INNER JOIN "Subjects" ON "Marks"."subjectId" = "Subjects".id
        WHERE "Marks"."deletedAt" IS null`;

    const { studentId, subjectId, name, subjectName, marks } = req.query;

    if (studentId) {
      query += ` AND "Students".id = :studentId`;
    }

    if (subjectId) {
      query += ` AND "Subjects".id = :subjectId`;
    }

    if (name) {
      query += ` AND "Students".name ILIKE :name`;
    }

    if(subjectName){
      query += ` AND "Subjects"."subjectName" ILIKE :subjectName`;
    }

    if(marks){
      query += ` AND "Marks".marks = :marks`;
    }
  
    const results = await db.sequelize.query(query, {
      type: QueryTypes.SELECT,
      plain: false,
      replacements: { studentId, subjectId, name: `%${name}%`, subjectName: `%${subjectName}%`, marks }
    });

    return results ? res.status(200).send({ status: true, data: results }) : res.status(404).send({ status: false, message: "Couldn't find" });
  } catch (err) {
    return res.status(400).send({ status: false, message: "Unknown error occurred", error: err.message });
  }
};


// fetching totalMarks 
const getTotalMarks = async (req, res) => {
  try {
    {   let query = `SELECT SUM("Marks".marks) as totalmarks, "Students".name
            FROM "Marks"
            INNER JOIN "Students" ON "Marks"."studentId" = "Students".id
            WHERE "Marks"."deletedAt" IS null
            GROUP BY "Students".id
            `;

            const { studentId,  name, classId } = req.query;

            if (studentId) {
              query += ` AND "Students".id = :studentId`;
            }
        
        
            if (name) {
              query += ` AND "Students".name ILIKE :name`;
            }
        
            if(classId){
              query += ` AND "Subjects"."classId" = :classId`;
            }

      const results = await db.sequelize.query(query, {
      type: QueryTypes.SELECT,
      replacements: { studentId, name: `%${name}%`, classId },
      plain: false,
      });
      
      return results ?  res.status(200).send({ status: true, data: results }) : res.status(404).send({status:false, message:"Couldn't find"})
    }
  } catch (err) {
    return res.status(400).send({status: false,message: "Unknown error occurred", error : err.message});
  }
};


// getting total Percentage
const getTotalParcentage = async (req, res) => {
  try {
let query = `SELECT CONCAT(ROUND((SUM("Marks".marks)*100)/SUM("Subjects"."totalMarks"), 2), ' %') as totalPercentage, "Students".name,
CASE
WHEN ROUND((SUM("Marks".marks)*100)/SUM("Subjects"."totalMarks"), 2) >= 35 THEN 'Pass'
ELSE 'Fail'
END AS result
FROM "Marks" 
INNER JOIN "Students"  ON "Marks"."studentId" = "Students".id 
INNER JOIN "Subjects"  ON "Marks"."subjectId" = "Subjects".id
WHERE "Marks"."deletedAt" IS null
GROUP BY "Students".id`;
const { studentId, name, classId } = req.query;

            if (studentId) {
              query += ` AND "Students".id = :studentId`;
            }
        
        
            if (name) {
              query += ` AND "Students".name ILIKE :name`;
            }
        
            if(classId){
              query += ` AND "Subjects"."classId" = :classId`;
            }


    const results = await db.sequelize.query(query, {
      type: QueryTypes.SELECT,
      plain: false,
      replacements: { studentId, name: `%${name}%`, classId },
    });

    return results ?  res.status(200).send({ status: true, data: results }) : res.status(404).send({status:false, message:"Couldn't find"})
  } catch (err) {
    return res.status(400).send({ status: false, message: "Unknown error occurred", error : err.message });
  }
};

// fetching toppers of the class 
const getAllToppers = async (req, res) => {
  try {
let query = `SELECT CONCAT(ROUND((SUM("Marks".marks)*100)/SUM("Subjects"."totalMarks"), 2), ' %') as totalPercentage, "Students".name,
CASE
WHEN ROUND((SUM("Marks".marks)*100)/SUM("Subjects"."totalMarks"), 2) >= 35 THEN 'Pass'
ELSE 'Fail'
END AS result
FROM "Marks" 
INNER JOIN "Students" ON "Marks"."studentId" = "Students".id 
INNER JOIN "Subjects" ON "Marks"."subjectId" = "Subjects".id
WHERE "Marks"."deletedAt" IS null
GROUP BY "Students".id 
ORDER BY totalPercentage DESC
LIMIT 1
`;
const {classId} = req.query;
if(classId){
  query += ` AND "Subjects"."classId" = :classId`;
}
const results = await db.sequelize.query(query, {
  type: QueryTypes.SELECT,
  replacements : {classId},
  plain: false,
    });

    return results ?  res.status(200).send({ status: true, data: results }) : res.status(404).send({status:false, message:"Couldn't find"})
  } catch (err) {
    return res.status(400).send({status: false,message: "Unknown error occurred"});
  }
};

// fetching average marks 
const getAverageMarksOfAClass = async (req, res) => {
  try {
    const {classId} = req.query
    let query = `
  WITH subquery AS (
    SELECT SUM("Marks".marks) AS totalMarks, "Classes".id AS classId, COUNT("Marks"."studentId") AS totalStudents
    FROM "Marks"
    INNER JOIN "Students" ON "Marks"."studentId" = "Students"."id"
    INNER JOIN "Classes" ON "Students"."classId" = "Classes"."id"
    WHERE "Marks"."deletedAt" IS NULL 
    GROUP BY "Classes".id
  )
  SELECT (subquery.totalMarks / subquery.totalStudents) AS averageScore , subquery.totalMarks AS totalMarks,  subquery.totalStudents AS totalStudents
  FROM subquery
`;

 if(classId){
  query += ` AND "Subjects"."classId" = :classId`;
}
    const results = await db.sequelize.query(query, {
      type: QueryTypes.SELECT,
      plain: false,
      replacements : {classId}
    });
   
    return results ?  res.status(200).send({ status: true, data: results }) : res.status(404).send({status:false, message:"Couldn't find"})
  } catch (err) {
    return res.status(400).send({status: false,message: "Unknown error occurred", error:err.message});
  }
};

const deleteMarks = async (req, res) => {
  try{
    const {id} = req.params;
  const query = `UPDATE "Marks" SET "deletedAt" = now() WHERE "deletedAt" IS NULL AND "id" = :id`;
    const results = await db.sequelize.query(query, {
     replacements : {id},
     type: QueryTypes.DELETE
    })
    return results.length ? res.status(200).send({status:true, message: "successfully removed"}) : res.status(400).send({status:false, message: "unable to remove"})   
  }
  catch(err){
    return res.status(400).send({status: false, message: err.message});
  }
}

module.exports = {
  addMarks,
  getMarks,
  getTotalMarks,
  getTotalParcentage,
  getAllToppers,
  getAverageMarksOfAClass,
  deleteMarks
};
