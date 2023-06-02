const AWS = require('aws-sdk');
const accessKeyId = "AKIAVB6DAJPO65YQGGWU";
const secretAccessKey =  "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";

AWS.config.update({
  region: 'us-east-2',
  credentials: {
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey
  }});

const lambda = new AWS.Lambda();

const params = {
  FunctionName: 'secondLamda',
  Payload: JSON.stringify({ key: 'value' }) // Optional payload
};

const lambdaFunction = async(req, res)=>{
lambda.invoke(params, function(err, data) {
  if (err) {
    console.log('Error:', err);
    return res.status(400).send({status:false, message: "error"})
  } else {
    return res.status(200).send({status:true, data: JSON.parse(data.Payload)})
  }
})
};

module.exports = {lambdaFunction}