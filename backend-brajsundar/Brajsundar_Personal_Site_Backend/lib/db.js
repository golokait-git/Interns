// // host: "127.0.0.1",
// // user: "root",
// // password: "Root@9913",
// // database: "brajsundar",

// // import mysql from "mysql2"

// export const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
// }).promise()

// pool.getConnection((err, connection) => {
//     if (err) {
//         console.error('Error connecting to MySQL:', err);
//     } else {
//         console.log('Connected to MySQL!');
//         connection.release();
//     }
// });

import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Connected to DataBase");
    });

    connection.on("error", (err) => {
      console.log("Connection error: ", err);
      process.exit();
    });
  } catch (error) {
    console.log("something goes wrong");
    console.log(error);
  }
}
