const pool = require("../../db");
const dbqueries = require("../../query");

// ------------------------------------------------------------- Fetching all students data ---------------------------------------------
const getStudents = (req, res) => {
  try {
    pool.query(dbqueries.getAllStudents, (error, results) => {
      if (error) {
        return res.status(400).send({ message: error.message });
      }
      return res.status(200).json(results.rows);
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

// ------------------------------------------------------------- Fetching a student data ---------------------------------------------

const getStudentById = (req, res) => {
  try {
    pool.query(dbqueries.getStudentById, [req.params.id], (error, results) => {
      if (error) {
        return res.status(400).send({ message: error.message });
      }
      if (!results.rows.length) {
        return res.status(200).json(results.rows);
      }
      return res
        .status(404)
        .send({ message: "No student found with this id " });
    });
  } catch (err) {
    return res.satus(500).send({ message: err.message });
  }
};

// ------------------------------------------------------------- Inserting a student data ---------------------------------------------
const addStudent = (req, res) => {
  try {
    const { name, email, age, dob } = req.body;
    pool.query(dbqueries.checkEmailExists, [email], (err, data) => {
      if (err) {
        return res.status(400).send({ message: "something went wrong" });
      }

      if (data.rows.length) {
        return res.status(409).send({ message: "Email already exists" });
      } else {
        pool.query(
          dbqueries.addStudent,
          [name, email, age, dob],
          (error, results) => {
            if (error) {
              return res.status(400).send({ message: error.message });
            }

            return res
              .status(201)
              .send({ message: "Student added successfully" });
          }
        );
      }
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

// ------------------------------------------------------------- Deleting a student data ---------------------------------------------





// -------------------------------------------------------------- exports -------------------------------------------
module.exports = {
  getStudents,
  getStudentById,
  addStudent,
};
