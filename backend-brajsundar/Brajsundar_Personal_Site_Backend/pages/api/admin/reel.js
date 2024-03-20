import { pool } from "lib/db";
const multer = require("multer");
import path from "path"

const storage = multer.diskStorage({
    destination: "/var/www/data/public",
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
})

import { connect } from "lib/db";
import Reel from "lib/models/reels";
import formidable from "formidable";

import { s3FileUpload, s3FileDelete } from "service/imageUploader";

import fs from "fs";
import mongoose from "mongoose";

connect();
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { page = 1, limit = 10, search = "" } = req.query;

      const filters = {};
      if (search) {
        filters.reelName = { $regex: new RegExp(search, "i") };
      }
      const skip = Math.max(0, (page - 1) * limit);

      const reels = await Reel.find(filters).skip(skip).limit(parseInt(limit));

      const totalReels = await Reel.countDocuments(filters);

      return res.status(200).json({
        reels,
        totalReels,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    const form = formidable({ multiples: false, keepExtensions: true });
    try {
      form.parse(req, async function (err, fields, files) {
        if (err) {
          return res.status(500).json({ error: "Parsing error" });
        }
        const reelId = new mongoose.Types.ObjectId().toHexString();
        const thumbnailFiles = files.reelpath[0];
        const data = fs.readFileSync(thumbnailFiles.filepath);

        const upload = await s3FileUpload({
          bucketName: process.env.S3_BUCKET_NAME,
          key: `Images/Reel/${reelId}/thumbnail.png`,
          body: data,
          contentType: thumbnailFiles.mimetype,
        });

        const createReel = await Reel.create({
          _id: reelId,
          reelName: fields.reelName[0],
          url: fields.url[0],
          reelpath: upload.Location,
        });

        const newReel = await createReel.save();

        return res.status(200).json({
          message: "reel created successfully",
          newReel,
        });
      });
    } catch (err) {
      console.log(err);
    }
  } else if (req.method === "PUT") {
    const form = formidable({ multiples: false, keepExtensions: true });
    try {
      const reelId = req.query.id;

      form.parse(req, async function (err, fields, files) {
        if (err) {
          return res.status(400).json({ error: "Error parsing form data" });
        }

        // const thumbnailFile = files.thumbnail[0];
        // const data = fs.readFileSync(thumbnailFile.filepath);
        // try {
        //   await s3FileDelete({
        //     bucketName: process.env.S3_BUCKET_NAME,
        //     key: `Images/Reel/${reelId}/thumbnail.png`,
        //   });
        // } catch (error) {
        //   console.error(error);
        // }
        // const upload = await s3FileUpload({
        //   bucketName: process.env.S3_BUCKET_NAME,
        //   key: `Images/Reel/${reelId}/thumbnail.png`,
        //   body: data,
        //   contentType: thumbnailFile.mimetype,
        // });
        const UpdateReel = await Reel.findByIdAndUpdate(reelId, {
          _id: reelId,
          reelName: fields.reelName,
          url: fields.url,
          // reelpath: upload.Location,
        });

        const UpdatedReel = await UpdateReel.save();
        return res.status(200).json({
          message: "Reel created successfully",
          UpdatedReel,
        });
      });
    } catch (err) {
      return res.status(400).json({
        message: "Error editing Reel",
        UpdatedReel,
      });
    }
  } else if (req.method === "DELETE") {
    try {
      const ReelId = req.query.id;

      const deletedReel = await Reel.findOneAndDelete({ _id: ReelId });
      if (!deletedReel) {
        return res.status(404).json({ message: "Reel not found" });
      }
      // const ReelIdToDelete = deletedReel._id;
      // try {
      //   await s3FileDelete({
      //     bucketName: process.env.S3_BUCKET_NAME,
      //     key: `Images/Reel/${ReelIdToDelete}/thumbnail.png`,
      //   });
      // } catch (error) {
      //   console.error(error);
      // }
      return res.status(200).json({
        message: "Reel and associated thumbnail deleted successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(400).json({ error: "Invalid request method" });
  }
}
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { page = 1, limit = 10, search = "" } = req.query;

      const filters = {};
      if (search) {
        filters.reelName = { $regex: new RegExp(search), $options: "i" };
      }

      const reels = await Reel.find(filters)
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

      const totalReels = await Reel.countDocuments(filters);

      return res.status(200).json({
        reels,
        totalReels,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    try {
      const { reelName, reelpath, url } = req.body;
      console.log(reelName);
      // if (!reelpath || !url) {
      //   throw new Error("All fields needed");
      // }
      const reel = new Reel({
        reelName,
        reelpath,
        url,
      });

      const newReel = await reel.save();
      return res.status(200).json({
        message: "Reel saved successfully",
        newReel,
      });
    } catch (error) {
      console.log("error");
    }
  } else if (req.method === "PUT") {
    try {
      const id = req.query.id;
      const { reelpath, url } = req.body;
      //   if (!reelpath || !url) {
      //     throw new Error("All fields needed");
      //   }
      const updatedReel = await Reel.findByIdAndUpdate(
        id,
        { reelpath, url },
        { new: true }
      );
      return res.status(200).json({
        message: "Reel saved successfully",
        updatedReel,
      });
    } catch (error) {
      console.log("error");
    }
  } else if (req.method === "DELETE") {
    try {
      const id = req.query.id;
      //   if (!reelpath || !url) {
      //     throw new Error("All fields needed");
      //   }
      const updatedReel = await Reel.findOneAndDelete({ id });
      return res.status(200).json({
        message: "Reel saved successfully",
        updatedReel,
      });
    } catch (error) {
      console.log("error");
    }
  } else {
    return res.status(400).json({ error: "Invalid request method" });
  }
}

// const upload = multer({ storage: storage });

// export default async function handler(req, res) {

//     if (req.method === "GET") {
//         try {
//             let query = "SELECT COUNT(*) AS totalReels FROM reels";
//             const [countResult] = await pool.query(query);
//             const totalReels = countResult[0].totalReels;
//             query = "SELECT * FROM reels";
//             let queryParams = [];
//             const page = parseInt(req.query.page) || 1;
//             const limit = parseInt(req.query.limit) || 200;
//             const offset = (page - 1) * limit;
//             query += " ORDER BY id DESC LIMIT ? OFFSET ?";
//             queryParams.push(limit, offset);
//             const [reels] = await pool.query(query, queryParams);
//             res.status(200).json({ reels, totalReels });
//         } catch (error) {
//             console.error("Error: Getting Reels, ", error);
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
//                 const { url } = req.body;
//                 const reel_path = req.file ? req.file.filename : null;
//                 const sql = "INSERT INTO reels (reel_path, create_date, url) VALUES (?, ?, ?)";
//                 await pool.query(sql, [reel_path, date, url]);

//                 res.status(200).json({ message: "Reel added successfully" });
//             } catch (error) {
//                 console.error("Error: Adding Reels, ", error.sqlMessage);
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
//             const sql = "DELETE FROM reels WHERE id = ?";
//             await pool.query(sql, [id]);
//             res.status(200).json({ message: "Deleted successfully" });
//         } catch (error) {
//             console.error("Error: Deleting Reels, ", error.sqlMessage);
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
