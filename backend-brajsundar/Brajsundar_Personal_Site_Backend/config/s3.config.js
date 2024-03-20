import aws, { S3 } from "aws-sdk";
import { S3Client } from "@aws-sdk/client-s3";

export const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
  bucketName: process.env.S3_BUCKET_NAME,
});

export const s3v3 = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS,
  },
});
