import { s3, s3v3 } from "../config/s3.config.js";
import {
  PutObjectCommand,
  DeleteBucketCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

export const s3FileUpload = async ({ bucketName, key, body, contentType }) => {
  return await s3
    .upload({
      Bucket: bucketName,
      Key: key,
      Body: body,
      ContentType: contentType,
    })
    .promise();
};

export const s3FileDelete = async ({ bucketName, key }) => {
  return await s3
    .deleteObject({
      Bucket: bucketName,
      Key: key,
    })
    .promise();
};

export const s3FileUploadv3 = async ({
  bucketName,
  key,
  body,
  contentType,
}) => {
  try {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: body,
      ContentType: contentType,
    });

    const url = await s3v3.send(command);
    return url;
  } catch (error) {
    console.error("File upload v3 : ", error);
  }
};

export const s3FileDeletev3 = async ({ bucketName, key }) => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    const url = await s3v3.send(command);
    return url;
  } catch (error) {
    console.error("File delete v3 : ", error);
  }
};
