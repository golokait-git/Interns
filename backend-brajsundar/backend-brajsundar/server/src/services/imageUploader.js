import s3 from "../config/s3.config.js";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

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

// export const s3v3 = new S3Client({
//   region: "",
//   credentials: {
//     accessKeyId: "",
//     secretAccessKey: "",
//   },
// });

// export const s3FileDeletev3 = async ({ bucketName, key }) => {
//   try {
//     const command = new DeleteObjectCommand({
//       Bucket: bucketName,
//       Key: key,
//     });

//     const url = await s3v3.send(command);
//     return url;
//   } catch (error) {
//     console.error("File delete v3 : ", error);
//   }
// };
