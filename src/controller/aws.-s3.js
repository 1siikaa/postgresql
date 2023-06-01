const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { fromEnv } = require("@aws-sdk/credential-provider-env");

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: fromEnv(),
});

const uploadFile = async (file) => {
  return new Promise(async (resolve, reject) => {
    const uploadParams = {
      ACL: "public-read",
      Bucket: "classroom-training-bucket",
      Key: "abc/" + file.originalname,
      Body: file.buffer,
    };

    try {
      const data = await s3Client.send(new PutObjectCommand(uploadParams));
      console.log(data);
      console.log("file uploaded successfully");
      resolve(`https://${uploadParams.Bucket}.s3.${s3Client.config.region}.amazonaws.com/${uploadParams.Key}`);
    } catch (err) {
      reject({ error: err });
    }
  });
};

const uploadingFiles = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).send({ status: false, message: "Please provide a file." });
    }
    let files = req.files;
    if (files && files.length > 0) {
      let uploadedFileURL = await uploadFile(files[0]);
      return res.status(201).send({ status: true, message: "file uploaded successfully", data: uploadedFileURL });
    } else {
      return res.status(400).send({ status: false, message: "No file found" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err });
  }
};



//----------------------------------------------------------------------------------------------------------------


module.exports = {uploadingFiles}
