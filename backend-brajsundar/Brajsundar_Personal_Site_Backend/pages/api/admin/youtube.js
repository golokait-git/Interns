import { connect } from "lib/db";
import Youtube from "lib/models/youtube";
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
        filters.video_name = { $regex: new RegExp(search, "i") };
      }
      const skip = Math.max(0, (page - 1) * limit);

      const youtubeVideo = await Youtube.find(filters)
        .skip(skip)
        .limit(parseInt(limit));

      const totalyoutubeVideo = await Youtube.countDocuments(filters);

      return res.status(200).json({
        youtubeVideo,
        totalyoutubeVideo,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    const form = formidable({ multiples: true, keepExtensions: true });

    try {
      form.parse(req, async function (err, fields, files) {
        const videoId = new mongoose.Types.ObjectId().toHexString();

        if (err) {
          return res.status(400).json({ error: "Error parsing form data" });
        }

        let videoUpload;
        let thumbnailUpload;
        let createYoutubeVideo;
        if (files.length > 0) {
          const videoFile = files.videoPath[0];
          const videoData = await fs.readFileSync(videoFile.filepath);
          videoUpload = await s3FileUpload({
            bucketName: process.env.S3_BUCKET_NAME,
            key: `Videos/${videoId}/video.mp4`,
            body: videoData,
            contentType: videoFile.mimetype,
          });

          const thumbnailFile = files.thumbnail[0];
          const thumbnailData = await fs.readFileSync(thumbnailFile.filepath);
          thumbnailUpload = await s3FileUpload({
            bucketName: process.env.S3_BUCKET_NAME,
            key: `Thumbnails/${videoId}/thumbnail.jpg`,
            body: thumbnailData,
            contentType: thumbnailFile.mimetype,
          });

          createYoutubeVideo = await Youtube.create({
            _id: videoId,
            video_name: fields.video_name[0],
            video_url: fields.video_url[0],
            category: fields.category[0],
            videoPath: videoUpload.Location,
            thumbnail: thumbnailUpload.Location,
          });
          const newVideo = await createYoutubeVideo.save();

          return res.status(200).json({
            message: "YouTube video created successfully",
            newVideo,
          });
        }
        console.log(fields.video_name, fields.video_url);
        createYoutubeVideo = await Youtube.create({
          _id: videoId,
          video_name: fields.video_name[0],
          video_url: fields.video_url[0],
          category: fields.category[0],
        });

        const newVideo = await createYoutubeVideo.save();

        return res.status(200).json({
          message: "YouTube video created successfully",
          newVideo,
        });
      });
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
      });
    }
  } else if (req.method === "DELETE") {
    try {
      const { _id } = req.query;
      const deletevedio = await Youtube.findOneAndDelete({ _id: _id });
      if (!deletevedio) {
        return res.status(404).json({
          message: "vedio not found",
        });
      }
      return res.status(200).json({
        message: "youtube vedio deleted successfully",
        deletevedio,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  } else if (req.method === "PUT") {
    try {
      const id = req.query.id;
      const { video_name, video_url, category } = req.body;
      console.log(video_name, video_url, category);
      const updatedVedio = await Youtube.findByIdAndUpdate(
        id,
        { video_name, video_url, category },
        { new: true }
      );
      return res.status(200).json({
        message: "vedio updated successfully",
        updatedVedio,
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

// import { pool } from "lib/db";

// export default async function handler(req, res) {
//     if (req.method === "GET" && req.query.type === "findcategory") {
//         const query = "SELECT * FROM youtube where category LIKE ?";
//         const [youtube] = await pool.query(query, [req.query.category]);
//         res.status(200).json({ youtube });
//     }
//     else if (req.method === "GET" && req.query.type === "categories") {
//         const query = "SELECT DISTINCT category FROM youtube";
//         const [categories] = await pool.query(query);
//         const distinctCategories = categories.map(category => category.category);
//         res.status(200).json({ categories: distinctCategories });
//     }
//     else if (req.method === "GET") {
//         const searchTerm = req.query.search || '';
//         try {
//             let query = "SELECT COUNT(*) AS totalYoutube FROM youtube";
//             let queryParams = [];
//             if (searchTerm) {
//                 query += " WHERE title LIKE ?";
//                 queryParams.push(`%${searchTerm}%`);
//             }
//             const [countResult] = await pool.query(query, queryParams);
//             const totalYoutube = countResult[0].totalYoutube;
//             query = "SELECT * FROM youtube";
//             queryParams = [];
//             if (searchTerm) {
//                 query += " WHERE title LIKE ?";
//                 queryParams.push(`%${searchTerm}%`);
//             } else {
//                 const page = parseInt(req.query.page) || 1;
//                 const limit = parseInt(req.query.limit) || 200;
//                 const offset = (page - 1) * limit;
//                 query += " ORDER BY id DESC LIMIT ? OFFSET ?";
//                 queryParams.push(limit, offset);
//             }

//             const [youtube] = await pool.query(query, queryParams);
//             res.status(200).json({ totalYoutube, youtube });
//         } catch (error) {
//             console.error("Error: Getting Youtube, ", error.sqlMessage);
//             res.status(500).json({
//                 message: "Internal Server Error",
//                 error: error
//             });
//         }
//     }
//     else if (req.method == "POST") {
//         const date = new Date();
//         try {
//             const { video_url, title, category } = req.body;
//             const sql = "INSERT INTO youtube (video_url, title, category, create_date) VALUES (?, ?, ?, ?)";
//             const [youtube] = await pool.query(sql, [video_url, title, category, date]);
//             res.status(200).json({ youtube });
//         } catch (error) {
//             console.error("Error: Getting Youtube, ", error.sqlMessage);
//             res.status(500).json({
//                 message: "Internal Server Error",
//                 error: error
//             });
//         }
//     } else if (req.method === "DELETE") {
//         try {
//             const id = req.query.id;
//             const sql = "DELETE FROM youtube WHERE id = ?";
//             await pool.query(sql, [id]);
//             res.status(200).json({ message: "Deleted successfully" });
//         } catch (error) {
//             console.error("Error: Deleting Youtube, ", error.sqlMessage);
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
