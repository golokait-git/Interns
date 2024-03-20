import Reel from "../models/reels.schemas.js";
import fs from "fs";
import { s3FileDelete, s3FileUpload } from "../services/imageUploader.js";
import formidable from "formidable";
import mongoose from "mongoose";

const uploadReel = async (req, res) => {
  const form = formidable({ multiples: false, keepExtensions: true });
  try {
    form.parse(req, async function (err, fields, files) {
      if (err) {
        return res.status(400).json({ error: "Error parsing form data" });
      }

      // console.log("--> files", files);
      const reelId = new mongoose.Types.ObjectId().toHexString();

      const thumbnailFile = files.reelThumbnail[0];
      const data = await fs.readFileSync(thumbnailFile.filepath);
      // console.log(data);

      const upload = await s3FileUpload({
        bucketName: process.env.S3_BUCKET_NAME,
        key: `Images/Reel/${reelId}/thumbnail_1.png`,
        body: data,
        contentType: thumbnailFile.mimetype,
      });

      const createReel = await Reel.create({
        _id: reelId,
        reelName: fields.reelName[0],
        url: fields.url[0],
        reelThumbnail: `https://d2lnag86znkprh.cloudfront.net/Images/Reel/${reelId}/thumbnail_1.png`,
      });
      const newReel = await createReel.save();

      return res.status(200).json({
        message: "Reel created successfully",
        newReel,
      });
    });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getReels = async (req, res) => {
  try {
    const allReels = await Reel.find();

    res.status(200).json({
      success: true,
      data: allReels,
      message: "Get all Reels",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteReel = async (req, res) => {
  try {
    const reelId = req.params.id;

    const reel = await Reel.findById(reelId);
    if (!reel)
      res.status(400).json({ message: "No reel with tha id ", error: error });

    try {
      await s3FileDelete({
        bucketName: process.env.S3_BUCKET_NAME,
        key: `Images/Reel/${reelId}/thumbnail.png`,
      });
      await Reel.findByIdAndDelete(reelId);
      res.status(200).json({ message: "reel deleted", data: reel });
    } catch (error) {
      res.status(400).json({ message: "cannot delete the reel", error: error });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getReel = async (req, res) => {
  try {
    const reelId = req.params.id;

    const findReel = await Reel.findById(reelId);

    if (!findReel) {
      return res.status(404).json({
        message: "Reel not found",
      });
    }
    // console.log(reelID)
    return res.status(200).json({
      message: "Find Reel By Id",
      findReel,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateReel = async (req, res) => {
  try {
    const form = formidable({ multiples: false, keepExtensions: true });
    const reelId = req.params.id;

    if (!reelId) {
      return res.status(400).json({ error: "Error finding reel" });
    }

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: "Parsing error" });
      }

      if (files.reelThumbnail) {
        const reelThumb = await Reel.findById(reelId);
        console.log(reelThumb);
        const url = reelThumb.reelThumbnail;
        console.log(url);
        const s3KeyArr = url.split(".net/");

        const s3Key = s3KeyArr[1];
        console.log(s3Key)
        await s3FileDelete({
          bucketName: process.env.S3_BUCKET_NAME,
          key: s3Key,
        });

        const regex = /thumbnail_(\d+).png/;

        const match = s3Key.match(regex);

        if (match) {
          const originalNumber = parseInt(match[1], 10);

          const newNumber = originalNumber + 1;

          var newUrl = s3Key.replace(regex, `thumbnail_${newNumber}.png`);
        } else {
          console.log("Pattern not found in the URL");
        }

        const thumbnailFile = files.reelThumbnail[0];

        const data =await fs.readFileSync(thumbnailFile.filepath);

        const upload = await s3FileUpload({
          bucketName: process.env.S3_BUCKET_NAME,
          key: newUrl ? newUrl : s3Key,
          body: data,
          contentType: thumbnailFile.mimetype,
        });
        const updatedReel = await Reel.findByIdAndUpdate(
          reelId,
          {
            reelName: fields.reelName[0],
            url: fields.url[0],
            reelThumbnail: `https://d2lnag86znkprh.cloudfront.net/${
              newUrl ? newUrl : s3Key
            }`,
          },
          { new: true }
        );
        return res.status(200).json({
          message: "Reel saved successfully",
          updatedReel,
        });
      } else {
        const updatedReel = await Reel.findByIdAndUpdate(
          reelId,
          {
            reelName: fields.reelName[0],
            url: fields.url[0],
          },
          { new: true }
        );
        return res.status(200).json({
          message: "Reel saved successfully",
          updatedReel,
        });
      }
    });
  } catch (error) {
    console.log("error");
  }
};

export { uploadReel, getReels, deleteReel, getReel, updateReel };
