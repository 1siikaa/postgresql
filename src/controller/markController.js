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
    return results.length ? res.status(201).send({status:true, message: "added successfully."}): res.status(400).send({status:false, message:'failed to insert'})
    }
  catch (err) {
    return res.status(400).send({status: false,message: "unknown error occured"});
  }
};

// fetching students marks
const getMarks = async (req, res) => {
  try {
    let query = `SELECT "m".marks, "m"."studentId",  "st".name, "sub"."subjectName", "m"."subjectId",
        "sub"."classId" FROM "Marks" m
        INNER JOIN "Students" st ON "m"."studentId" = "st".id
        INNER JOIN "Subjects" sub ON "m"."subjectId" = "sub".id
        WHERE "m"."deletedAt" IS null`;

    const { studentId, subjectId, name, subjectName, marks } = req.query;

    if (studentId) {
      query += ` AND "st".id = :studentId`;
    }

    if (subjectId) {
      query += ` AND "sub".id = :subjectId`;
    }

    if (name) {
      query += ` AND "st".name ILIKE :name`;
    }

    if(subjectName){
      query += ` AND "sub"."subjectName" ILIKE :subjectName`;
    }

    if(marks){
      query += ` AND "m".marks = :marks`;
    }
  
    const results = await db.sequelize.query(query, {
      type: QueryTypes.SELECT,
      plain: false,
      replacements: { studentId, subjectId, name: `%${name}%`, subjectName: `%${subjectName}%`, marks }
    });

    return results.length ? res.status(200).send({ status: true, data: results }) : res.status(404).send({ status: false, message: "Couldn't find" });
  } catch (err) {
    return res.status(400).send({ status: false, message: "Unknown error occurred" });
  }
};


// fetching totalMarks 
const getTotalMarks = async (req, res) => {
  try {
    {   let query = `SELECT SUM("m".marks) as totalmarks, "st".name
            FROM "Marks" m
            INNER JOIN "Students" st ON "m"."studentId" = "st".id
            WHERE "m"."deletedAt" IS null
            GROUP BY "st".id
            `;

            const { studentId,  name, classId } = req.query;

            if (studentId) {
              query += ` AND "st".id = :studentId`;
            }
        
        
            if (name) {
              query += ` AND "st".name ILIKE :name`;
            }
        
            if(classId){
              query += ` AND "m"."classId" = :classId`;
            }

      const results = await db.sequelize.query(query, {
      type: QueryTypes.SELECT,
      replacements: { studentId, name: `%${name}%`, classId },
      plain: false,
      });
      
      return results.length ?  res.status(200).send({ status: true, data: results }) : res.status(404).send({status:false, message:"Couldn't find"})
    }
  } catch (err) {
    return res.status(400).send({status: false,message: "Unknown error occurred"});
  }
};


// getting total Percentage
const getTotalParcentage = async (req, res) => {
  try {
let query = `SELECT CONCAT(ROUND((SUM("m".marks)*100)/SUM("sub"."totalMarks"), 2), ' %') as totalPercentage, "st".name,
CASE
WHEN ROUND((SUM("m".marks)*100)/SUM("sub"."totalMarks"), 2) >= 35 THEN 'Pass'
ELSE 'Fail'
END AS result
FROM "Marks" m
INNER JOIN "Students" st  ON "m"."studentId" = "st".id 
INNER JOIN "Subjects" sub ON "m"."subjectId" = "sub".id
WHERE "m"."deletedAt" IS null
GROUP BY "st".id`;
const { studentId, name, classId } = req.query;

            if (studentId) {
              query += ` AND "st".id = :studentId`;
            }
        
        
            if (name) {
              query += ` AND "st".name ILIKE :name`;
            }
        
            if(classId){
              query += ` AND "sub"."classId" = :classId`;
            }


    const results = await db.sequelize.query(query, {
      type: QueryTypes.SELECT,
      plain: false,
      replacements: { studentId, name: `%${name}%`, classId },
    });

    return results.length ?  res.status(200).send({ status: true, data: results }) : res.status(404).send({status:false, message:"Couldn't find"})
  } catch (err) {
    return res.status(400).send({ status: false, message: "Unknown error occurred"});
  }
};

// fetching toppers of the class 
const getAllToppers = async (req, res) => {
  try {
    const { classId } = req.query;

    let query= `WITH subquery AS (
      SELECT CONCAT(ROUND((SUM(m.marks) * 100) / SUM(sub."totalMarks"), 2), ' %') AS HighestPercentage,
             st.name AS StudentName,
             cls.id AS ClassId,
             CASE
               WHEN ROUND((SUM(m.marks) * 100) / SUM(sub."totalMarks"), 2) >= 35 THEN 'Pass'
               ELSE 'Fail'
             END AS Result,
             RANK() OVER (PARTITION BY cls.id ORDER BY (SUM(m.marks) * 100) / SUM(sub."totalMarks") DESC) AS RankNumber
      FROM "Marks" m
        INNER JOIN "Students" st ON m."studentId" = st.id
        INNER JOIN "Subjects" sub ON m."subjectId" = sub.id
        INNER JOIN "Classes" cls ON m."classId" = cls.id
      WHERE m."deletedAt" IS NULL`;

    if (classId) {
      query += ` AND cls.id = :classId`;
    }

    query += `
    GROUP BY cls.id, st.id, st.name
    )
    SELECT HighestPercentage, StudentName, ClassId, Result, RankNumber
    FROM subquery
    WHERE RankNumber = 1;`;

    const results = await db.sequelize.query(query, {
      type: QueryTypes.SELECT,
      replacements: { classId },
      plain: false,
    });

    return results.length
      ? res.status(200).send({ status: true, data: results })
      : res.status(404).send({ status: false, message: "Couldn't find" });
  } catch (err) {
    return res
      .status(400)
      .send({ status: false, message: "Unknown error occurred"});
  }
};


// fetching average marks 
const getAverageMarksOfAClass = async (req, res) => {
  try {
    const {classId} = req.query
    let query = `
  WITH subquery AS (
    SELECT SUM("m".marks) AS totalMarks, "cls".id AS classId, COUNT("m"."studentId") AS totalStudents
    FROM "Marks" m
    INNER JOIN "Students" st ON "m"."studentId" = "st"."id"
    INNER JOIN "Classes" cls ON "st"."classId" = "cls"."id"
    WHERE "m"."deletedAt" IS NULL 
    GROUP BY "cls".id
  )
  SELECT (subquery.totalMarks / subquery.totalStudents) AS averageScore , subquery.totalMarks AS totalMarks,  subquery.totalStudents AS totalStudents
  FROM subquery
`;

 if(classId){
  query += ` AND "m"."classId" = :classId`;
}
    const results = await db.sequelize.query(query, {
      type: QueryTypes.SELECT,
      plain: false,
      replacements : {classId}
    });
   
    return results.length ?  res.status(200).send({ status: true, data: results }) : res.status(404).send({status:false, message:"Couldn't find"})
  } catch (err) {
    return res.status(400).send({status: false,message: "Unknown error occurred"});
  }
};

const deleteMarks = async (req, res) => {
  try{
    const {id} = req.params;
  const query = `UPDATE "Marks" SET "deletedAt" = now() WHERE "deletedAt" IS NULL AND "id" = :id`;
    const results = await db.sequelize.query(query, {
     replacements : {id},
     type: QueryTypes.UPDATE
    })
    return results.length ? res.status(200).send({status:true, message: "successfully removed"}) : res.status(400).send({status:false, message: "unable to remove"})   
  }
  catch(err){
    return res.status(400).send({status: false});
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
