const axios = require('axios')
const fetchPincode = async function(req,res){
    try{
        let pincode = req.params.pincode;
        let options={
            method: "get",
            url : `https://api.postalpincode.in/pincode/${pincode}`
        }
      let result= await axios(options)
      let store= result.data
      console.log(store[0].PostOffice)
      
     return res.status(201).send({status:true,  data:store[0].PostOffice})}

    catch(error){
      return res.status(500).send({status:false , message:error.message})
    }}

module.exports.fetchPincode = fetchPincode