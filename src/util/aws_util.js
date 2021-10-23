const mime = require("mime");
const AWS = require("aws-sdk");

const getRandomArbitrary = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const getS3SignedUrlParams = (key, mimetype, businessId) => ({
  Bucket: `${process.env.AWS_BUCKET_URL}/${businessId}`,
  Key: key,
  Expires: 500,
  ACL: "public-read",
  ContentType: mime.getType(mimetype),
});

const getS3SignedUrl = ({ key, mimetype, businessId }) => {
  console.log(key, mimetype, businessId);
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    signatureVersion: "v4",
    region: process.env.AWS_BUCKET_REGION,
  });
  const s3_filename =
    new Date().getTime().toString() +
    "_" +
    getRandomArbitrary(100, 999).toString() +
    "_" +
    key;

  const s3 = new AWS.S3();
  return new Promise((resolve, reject) => {
    s3.getSignedUrl(
      "putObject",
      getS3SignedUrlParams(s3_filename, mimetype, businessId),
      (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        if (res) {
          resolve({
            mimetype,
            s3_filename,
            filename: key,
            signedRequestUrl: res,
            url: `https://${process.env.AWS_BUCKET_URL}.s3.amazonaws.com/${businessId}/${s3_filename}`,
          });
        }
      }
    );
  });
};
module.exports = {
  getS3SignedUrl,
};
