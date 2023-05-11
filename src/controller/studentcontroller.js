const pool = require('../../db')

const getStudents = async (req, res)=>{
try{
pool.query("SELECT * FROM students", (error, results)=>{
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