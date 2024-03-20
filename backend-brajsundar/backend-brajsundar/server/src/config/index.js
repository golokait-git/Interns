import dotenv from "dotenv";

dotenv.config();

const config = {
  MONGODB_URL: process.env.MONGODB_URL,
  PORT: process.env.PORT || 5000,
  S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
  S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
  S3_REGION: process.env.S3_REGION,
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME
};

export default config;
