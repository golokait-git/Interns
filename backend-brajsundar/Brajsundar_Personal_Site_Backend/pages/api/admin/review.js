// import { pool } from "lib/db";
// const multer = require("multer");
// import path from "path"

import Cors from "cors";
import { runMiddleware } from "../../../utils/runMiddleware";

import { connect } from "lib/db";
import Review from "lib/models/review";

connect();
const cors = Cors({
  credentials: true,
  origin: "http://localhost:3000",
});

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  if (req.method === "GET") {
    try {
      const { page = 1, limit = 10, search = "" } = req.query;
      const filters = {};
      if (search) {
        filters.name = { $regex: new RegExp(search, "i") };
      }
      const skip = Math.max(0, (page - 1) * limit);

      const Reviews = await Review.find(filters)
        .skip(skip)
        .limit(parseInt(limit));

      const totalReviews = await Review.countDocuments(filters);

      return res.status(200).json({
        message: "All Reviews ",
        Reviews,
        totalReviews,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    try {
      const { name, message, BookId } = req.body;
      
    if (!name || !message || !BookId) {
      return res.json({
          success: false,
          message: "please provide email and password"
      })
  }
      console.log("Hey", name, message);
      if (!name) {
        throw new Error("Invalid");
      }
      const newReview = new Review({ name, message, BookId });
      const updatedReview = await newReview.save();
      console.log(updatedReview);
      return res.status(200).json({
        message: "Review saved successfully",
        updatedReview,
      });
    } catch (error) {
      console.log("error");
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  } else if (req.method === "PUT") {
    try {
      const id = req.query.id;
      const { name, message, BookId, fileName } = req.body;
      const updatedReview = await Review.findByIdAndUpdate(
        id,
        { name, message, BookId, fileName },
        { new: true }
      );

      return res.status(200).json({
        message: "Review updated successfully",
        updatedReview,
      });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      const deletedReview = await Review.findOneAndDelete({ _id: id });
      return res.status(200).json({
        message: "Review deleted successfully",
        deletedReview,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  } else {
    return res.status(400).json({ error: "Invalid request method" });
  }
}

// const storage = multer.diskStorage({
//   destination: "/var/www/data/public",
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// })

// const upload = multer({ storage: storage });

// export default async function handler(req, res) {
//   if (req.method === "GET") {
//     try {
//       let query = "SELECT COUNT(*) AS totalReviews FROM review";
//       let queryParams = [];
//       let searchCondition = "";
//       const searchName = req.query.search;
//       if (searchName) {
//         searchCondition = " WHERE name LIKE ?";
//         queryParams.push(`%${searchName}%`);
//       }

//       query += searchCondition;

//       const [countResult] = await pool.query(query, queryParams);
//       const totalReviews = countResult[0].totalReviews;

//       query = "SELECT * FROM review";
//       queryParams = [];

//       if (searchName) {
//         query += searchCondition;
//         queryParams.push(`%${searchName}%`);
//       }

//       const page = parseInt(req.query.page) || 1;
//       const limit = parseInt(req.query.limit) || 200;
//       const offset = (page - 1) * limit;

//       query += " ORDER BY id DESC LIMIT ? OFFSET ?";
//       queryParams.push(limit, offset);

//       const [reviews] = await pool.query(query, queryParams);

//       res.status(200).json({ reviews, totalReviews });
//     } catch (error) {
//       console.error("Error: Getting Reviews, ", error);
//       res.status(500).json({
//         message: "Internal Server Error",
//         error: error
//       });
//     }
//   }

//   else if (req.method === "POST") {
//     upload.single("file")(req, res, async (err) => {
//       if (err) {
//         console.error(err);
//         return res.status(200).json({ message: "Error Uploading Image" });
//       }
//       const date = new Date();
//       try {
//         const { name, message, book_id } = req.body;
//         const file_name = req.file ? req.file.filename : null;
//         const sql = "INSERT INTO review (name, file_name, create_date, message, book_id) VALUES (?, ?, ?, ?, ?)";
//         const [review] = await pool.query(sql, [name, file_name, date, message, book_id]);
//         res.status(200).json({ review });
//       } catch (error) {
//         console.error("Error: Getting Reviews, ", error);
//         res.status(500).json({
//           message: "Internal Server Error",
//           error: error
//         });
//       }
//     });
//   }
//   else if (req.method === "DELETE") {
//     try {
//       const id = req.query.id;
//       const sql = "DELETE FROM review WHERE id = ?";
//       await pool.query(sql, [id]);
//       res.status(200).json({ message: "Book Deleted successfully" });
//     } catch (error) {
//       console.error("Error: Deleting Reviews, ", error);
//       res.status(500).json({
//         message: "Internal Server Error",
//         error: error
//       });
//     }
//   }
// }

// export const config = {
//   api: {
//     bodyParser: false
//   }
// }
