const aws = require('aws-sdk');
require('dotenv').config()
aws.config.update({
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
  region:  process.env.REGION
})

let uploadFile = async(req, res) => {
  return new Promise((resolve, reject)=> {
  
  let s3= new aws.S3({apiVersion: '2006-03-01'}); // I am using the s3 service of aws

  var uploadParams= {
      ACL: "public-read",
      Bucket: "classroom-training-bucket",
      Key: "abc/" + file.originalname, 
      Body: file.buffer
  }


  s3.upload( uploadParams, function (err, data ){
      if(err) {
          return reject({"error": err})
      }
      console.log(data)
      console.log("file uploaded succesfully")
      return resolve(data.Location)
  })
})
}

const uploadingFiles= async(req, res)=>{

    try{
        if(!req.files){
            return res.status(400).send({status:false, message: "Please provide a file."})
        }
        let files= req.files
        if(files && files.length>0){
            let uploadedFileURL= await uploadFile( files[0] )
            return res.status(201).send({status:true, message: "file uploaded succesfully", data: uploadedFileURL})
        }
        else{
            return res.status(400).send({ status:false, message: "No file found" })
        }
        
    }
    catch(err){
        return res.status(500).send({status:false, message: err})
    }
}



//----------------------------------------------------------------------------------------------------------------


module.exports = {uploadingFiles}
