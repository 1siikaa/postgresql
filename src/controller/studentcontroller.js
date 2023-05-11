const pool = require('../../db')
const dbquery = require('../../query');

// ------------------------------------------------------------- Fetching all students data ---------------------------------------------
const getStudents = async (req, res)=>{
try{
pool.query(dbquery.getAllStudents, (error, results)=>{
    if(error){
            res.send({"message":error.message});
        }
        res.status(200).json(results.rows);
})
}
catch(err){
    res.send({"message":err.message});
}
}




module.exports = {
    getStudents
}