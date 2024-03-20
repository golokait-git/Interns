import formidable from "formidable";
import Video from "../models/youtube.schema.js";
import fs from "fs";
import { s3FileUpload } from "../services/imageUploader.js";
import mongoose from "mongoose";

// Get all videos
const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific video
const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createVideo = async (req, res) => {
  const form = formidable({ multiples: false, keepExtensions: true });
  try {
    form.parse(req, async function (err, fields, files) {
      if (!fields.videoName || !fields.video_url || !fields.category) {
        return res
          .status(400)
          .json({ error: "Please provide videoName, video_url, and category" });
      }

      const videoId = new mongoose.Types.ObjectId().toHexString();
      console.log(files);

      let videoUpload = null;
      let thumbnailUpload = null;

      if (files.videoThumbnail && files.videoPath) {
        const videoFile = files.videoPath[0];
        const videoData = await fs.promises.readFile(videoFile.filepath);
        videoUpload = await s3FileUpload({
          bucketName: process.env.S3_BUCKET_NAME,
          key: `Videos/${videoId}/video.mp4`,
          body: videoData,
          contentType: videoFile.mimetype,
        });

        const thumbnailFile = files.videoThumbnail[0];
        const thumbnailData = await fs.promises.readFile(
          thumbnailFile.filepath
        );
        thumbnailUpload = await s3FileUpload({
          bucketName: process.env.S3_BUCKET_NAME,
          key: `Images/Video/${videoId}/thumbnail.png`,
          body: thumbnailData,
          contentType: thumbnailFile.mimetype,
        });
      }

      const createVideo = await Video.create({
        _id: videoId,
        videoName: fields.videoName[0],
        video_url: fields.video_url[0],
        category: fields.category[0],
        videoPath: videoUpload ? videoUpload.Location : null,
        videoThumbnail: thumbnailUpload ? thumbnailUpload.Location : null,
      });

      const newVideo = await createVideo.save();

      return res.status(200).json({
        message: "Video created successfully",
        newVideo,
      });
    });
  } catch (err) {
    console.error("Error creating video:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a video
const updateVideo = async (req, res) => {
  const form = formidable({ multiples: false, keepExtensions: true });

  try {
    const videoId = req.params.id;
    if (!videoId) {
      return res.status(400).json({ error: "Error finding Video" });
    }

    form.parse(req, async function (err, fields, files) {
      if (err) {
        return res.status(400).json({ error: "Error parsing form data" });
      }

      // Validate incoming data
      if (!fields.videoName || !fields.video_url || !fields.category) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Update video in the database
      const updatedVideo = await Video.findByIdAndUpdate(
        videoId,
        {
          videoName: fields.videoName[0],
          video_url: fields.video_url[0],
          category: fields.category[0],
        },
        { new: true }
      );

      return res.status(200).json({
        message: "Video updated successfully",
        updatedVideo,
      });
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


// Delete a video
const deleteVideo = async (req, res) => {
  try {
    const deletedVideo = await Video.findByIdAndDelete(req.params.id);
    if (!deletedVideo) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.json(deletedVideo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllVideos, getVideoById, createVideo, updateVideo, deleteVideo };
