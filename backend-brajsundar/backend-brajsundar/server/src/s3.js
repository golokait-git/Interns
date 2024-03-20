import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import config from "./config/index.js";

import dotenv from "dotenv";

dotenv.config();

const bucketName = config.S3_BUCKET_NAME;
const region = config.S3_REGION;
const accessKeyId = config.S3_ACCESS_KEY;
const secretAccessKey = config.S3_SECRET_ACCESS_KEY;

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export function uploadFile(fileBuffer, fileName, mimetype) {
  const uploadParams = {
    Bucket: bucketName,
    Body: fileBuffer,
    Key: `Images/Book/${fileName}`,
    ContentType: mimetype,
  };
  console.log("File uploaded");

  return s3Client.send(new PutObjectCommand(uploadParams));
}
