const AWS = require('aws-sdk');
const accessKeyId = "access_key_id";
const secretAccessKey =  "secret_access_key";

AWS.config.update({
  region: 'region',
  credentials: {
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey
  }});

const lambda = new AWS.Lambda();

const params = {
  FunctionName: 'myfunctionname',
 Payload: JSON.stringify({ key: 'value' }) // Optional payload
};

const lambdaFunction = async(req, res)=>{
lambda.invoke(params, function(err, data) {
  if (err) {
    console.log('Error:', err);
    return res.status(400).send({status:false, message: err.name})
  } else {
    return res.status(200).send({status:true, data: JSON.parse(data.Payload)})
  }
})
};

module.exports = {lambdaFunction}