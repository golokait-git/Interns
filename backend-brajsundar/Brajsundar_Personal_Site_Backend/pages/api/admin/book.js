// import { pool } from "lib/db";
// const multer = require("multer");
// import path from "path"

// const storage = multer.diskStorage({
//     destination: "/var/www/data/public",
//     filename: (req, file, cb) => {
//         cb(
//             null,
//             file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//         );
//     },
// })
// const upload = multer({ storage: storage });

import { NextRequest } from "next/server";
import { connect } from "lib/db";
import { s3FileUpload, s3FileDelete } from "service/imageUploader";
import Book from "lib/models/books";
import formidable from "formidable";
// import { IncomingForm } from "formidable";
import fs from "fs";
import mongoose from "mongoose";

connect();
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { page = 1, limit = 10, search = "" } = req.query;
      const filters = {};
      if (search) {
        filters.bookName = { $regex: new RegExp(search, "i") };
      }
      const skip = Math.max(0, (page - 1) * limit);

      const Books = await Book.find(filters).skip(skip).limit(parseInt(limit));

      const totalBooks = await Book.countDocuments(filters);

      return res.status(200).json({
        Books,
        totalBooks,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    const form = formidable({ multiples: false, keepExtensions: true });
    try {
     
      form.parse(req, async function (err, fields, files) {
        if (!fields.bookName || !fields.bookLink || !fields.detail || !fields.country) {

          return res.json({
            success: false,
            message: "please provide all field"
          })
  
        }
        const bookId = new mongoose.Types.ObjectId().toHexString();

        const thumbnailFile = files.thumbnail[0];

        const data = fs.readFileSync(thumbnailFile.filepath);

        const upload = await s3FileUpload({
          bucketName: process.env.S3_BUCKET_NAME,
          key: `Images/Book/${bookId}/thumbnail.png`,
          body: data,
          contentType: thumbnailFile.mimetype,
        });

       

        const createBook = await Book.create({
          _id: bookId,
          bookName: fields.bookName[0],
          bookLink: fields.bookLink[0],
          detail: fields.detail[0],
          country: fields.country[0],
          prebook: fields.prebook[0],
          thumbnail: upload.Location,
        });
        const newBook = await createBook.save();

        return res.status(200).json({
          message: "Book created successfully",
          newBook,
        });
      });
    } catch (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "PUT") {
    const form = formidable({ multiples: false, keepExtensions: true });
    try {
      const bookId = req.query.id;
      console.log(bookId);
      form.parse(req, async function (err, fields, files) {
        if (err) {
          return res.status(400).json({ error: "Error parsing form data" });
        }

        // if (files) {
        //   try {
        //     await s3FileDelete({
        //       bucketName: process.env.S3_BUCKET_NAME,
        //       key: `Images/Book/${bookId}/thumbnail.png`,
        //     });
        //   } catch (error) {
        //     console.error(error);
        //   }
        // } else {
        //   console.error("No files found");
        // }
        const thumbnailFile = files.thumbnail[0];
        const data = fs.readFileSync(thumbnailFile.filepath);
        // try {
        //   await s3FileDelete({
        //     bucketName: process.env.S3_BUCKET_NAME,
        //     key: `Images/Book/${bookId}/thumbnail.png`,
        //   });
        // } catch (error) {
        //   console.error(error);
        // }
        const upload = await s3FileUpload({
          bucketName: process.env.S3_BUCKET_NAME,
          key: `Images/Book/${bookId}/thumbnail.png`,
          body: data,
          contentType: thumbnailFile.mimetype,
        });
        const UpdateBook = await Book.findByIdAndUpdate(bookId, {
          bookName: fields.bookName[0],
          bookLink: fields.bookLink[0],
          detail: fields.detail[0],
          country: fields.country[0],
          prebook: fields.prebook[0],
          thumbnail: upload.Location,
        });
        const UpdatedBook = await UpdateBook.save();
        return res.status(200).json({
          message: "Book created successfully",
          UpdatedBook,
        });
      });
    } catch (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "DELETE") {
    const form = formidable({ multiples: false, keepExtensions: true });
    try {
      const bookId = req.query.id;
      console.log(bookId);
      const deletedBook = await Book.findOneAndDelete({ _id: bookId });
      if (!deletedBook) {
        return res.status(404).json({ message: "Book not found" });
      }
      const bookIdToDelete = deletedBook._id;

      try {
        await s3FileDelete({
          bucketName: process.env.S3_BUCKET_NAME,
          key: `Images/Book/${bookIdToDelete}`,
        });
      } catch (error) {
        console.error("S3 Delete Error:", error);
      }

      return res.status(200).json({
        message: "Book and associated thumbnail deleted successfully",
        deletedBook,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(400).json({ error: "Invalid request method" });
  }
}

// const storage = multer.diskStorage({
//     destination: "/var/www/data/public",
//     filename: (req, file, cb) => {
//         cb(
//             null,
//             file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//         );
//     },
// })

// const upload = multer({ storage: storage });

// export default async function handler(req, res) {
//     if (req.method === "GET") {
//         try {
//             let query = "SELECT COUNT(*) AS totalBooks FROM books";
//             let queryParams = [];
//             let searchCondition = "";
//             const searchName = req.query.search;
//             if (searchName) {
//                 searchCondition = " WHERE book_name LIKE ?";
//                 queryParams.push(`%${searchName}%`);
//             }

//             query += searchCondition;

//             const [countResult] = await pool.query(query, queryParams);
//             const totalBooks = countResult[0].totalBooks;

//             query = "SELECT * FROM books";
//             queryParams = [];

//             if (searchName) {
//                 query += searchCondition;
//                 queryParams.push(`%${searchName}%`);
//             }

//             const page = parseInt(req.query.page) || 1;
//             const limit = parseInt(req.query.limit) || 200;
//             const offset = (page - 1) * limit;

//             query += " ORDER BY id DESC LIMIT ? OFFSET ?";
//             queryParams.push(limit, offset);

//             const [books] = await pool.query(query, queryParams);

//             res.status(200).json({ books, totalBooks });
//         } catch (error) {
//             console.error("Error: Getting Books, ", error);
//             res.status(500).json({
//                 message: "Internal Server Error",
//                 error: error
//             });
//         }
//     }

//     else if (req.method == "POST") {
//         upload.single("file")(req, res, async (err) => {
//             if (err) {
//                 console.error(err);
//                 return res.status(200).json({ message: "Error Uploading Image" });
//             }
//             const date = new Date();
//             try {
//                 const { book_name, details, prebook, country, link } = req.body;
//                 const book_path = req.file ? req.file.filename : null;
//                 const sql = "INSERT INTO books (book_name, book_path, create_date, details, prebook, country, link) VALUES (?, ?, ?, ?, ?, ?, ?)";
//                 const [book] = await pool.query(sql, [book_name, book_path, date, details, prebook, JSON.stringify(country), JSON.stringify(link)]);
//                 res.status(200).json({ book });
//             } catch (error) {
//                 console.error("Error: Getting Books, ", error);
//                 res.status(500).json({
//                     message: "Internal Server Error",
//                     error: error
//                 });
//             }
//         });
//     }
//     else if (req.method === "DELETE") {
//         try {
//             const id = req.query.id;
//             const sql = "DELETE FROM books WHERE id = ?";
//             await pool.query(sql, [id]);
//             res.status(200).json({ message: "Book Deleted successfully" });
//         } catch (error) {
//             console.error("Error: Deleting Books, ", error);
//             res.status(500).json({
//                 message: "Internal Server Error",
//                 error: error
//             });
//         }
//     }
// }

export const config = {
  api: {
    bodyParser: false,
  },
};
