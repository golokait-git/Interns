import Article from "../models/articles.schema.js";
import fs from "fs";
import { s3FileUpload, s3FileDelete } from "../services/imageUploader.js";
import formidable from "formidable";
import mongoose from "mongoose";

const uploadArticle = async (req, res) => {
  const form = formidable({ multiples: false, keepExtensions: true });
  try {
    form.parse(req, async  (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      const articleId = new mongoose.Types.ObjectId().toHexString();
      if (!articleId) {
        throw new Error("Failed to generate articleId");
      }
      console.log(articleId);
      // if (!fields.title || !fields.content) {
      //   throw new Error("All fields needed");
      // }

      const thumbnailFile = files.thumbnail[0];
      console.log(thumbnailFile);

      const data = await fs.readFileSync(thumbnailFile.filepath);

      const thumbnailUpload = await s3FileUpload({
        bucketName: process.env.S3_BUCKET_NAME,
        key: `Images/Article/${articleId}/thumbnail_1.png`, //`https://d2lnag86znkprh.cloudfront.net/Images/Book/${bookId}/thumbnail.png`
        body: data,
        contentType: "image/png",
      });

      const article = await Article.create({
        _id: articleId,
        title: fields.title[0],
        content: fields.content[0],
        thumbnail: `https://d2lnag86znkprh.cloudfront.net/Images/Article/${articleId}/thumbnail_1.png`,
      });

      const newArticle = await article.save();

      return res.status(200).json({
        success: true,
        message: "Article saved successfully",
        data: newArticle,
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getArticles = async (req, res) => {
  try {
    const allArticles = await Article.find();

    res.status(200).json({
      success: true,
      data: allArticles,
      message: "Get all Articles",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const ArticleId = req.params.id;

    const article = await Article.findById(ArticleId);

    if (!article)
      res
        .status(400)
        .json({ message: "No Article with tha id ", error: error });

    try {
      const url = article.thumbnail;

      const s3KeyArr = url.split(".net/");

      const s3Key = s3KeyArr[1];
      await s3FileDelete({
        bucketName: process.env.S3_BUCKET_NAME,
        key: s3Key,
      });
      await Article.findByIdAndDelete(ArticleId);
      res.status(200).json({ message: "Article deleted", data: article });
    } catch (error) {
      res
        .status(400)
        .json({ message: "cannot delete the Article", error: error.message });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getArticle = async (req, res) => {
  try {
    const articleId = req.params.id;

    const findArticle = await Article.findById(articleId);

    if (!findArticle) {
      return res.status(404).json({
        message: "article not found",
      });
    }

    return res.status(200).json({
      message: "Find article By Id",
      findArticle,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateArticle = async (req, res) => {
  const form = formidable({ multiples: false, keepExtensions: true });
  try {
    const articleId = req.params.id;
    if (!articleId) {
      return res.status(400).json({ error: "Error finding Article" });
    }
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (files.thumbnail) {
        const articleThumb = await Article.findById(articleId);
        console.log(articleThumb);

        const url = articleThumb.thumbnail;
        console.log(url);

        const s3KeyArr = url.split(".net/");

        const s3Key = s3KeyArr[1];
        console.log(s3Key);
        await s3FileDelete({
          bucketName: process.env.S3_BUCKET_NAME,
          key: s3Key,
        });
        const regex = /thumbnail_(\d+).png/;

        const match = s3Key.match(regex);
        let newUrl;

        if (match) {
          const originalNumber = parseInt(match[1], 10);

          const newNumber = originalNumber + 1;

          newUrl = s3Key.replace(regex, `thumbnail_${newNumber}.png`);
        } else {
          console.log("Pattern not found in the URL");
        }

        const thumbnailFile = files.thumbnail[0];
        console.log(thumbnailFile);

        const data = await fs.readFileSync(thumbnailFile.filepath);

        const thumbnailUpload = await s3FileUpload({
          bucketName: process.env.S3_BUCKET_NAME,
          key: newUrl ? newUrl : s3Key,
          body: data,
          contentType: thumbnailFile.mimetype,
        });

        const updatedArticle = await Article.findByIdAndUpdate(
          articleId,
          {
            title: fields.title[0],
            content: fields.content[0],
            thumbnail: `https://d2lnag86znkprh.cloudfront.net/${
              newUrl ? newUrl : s3Key
            }`,
          },
          { new: true }
        );

        return res.status(200).json({
          success: true,
          message: "Article saved successfully",
          updatedArticle,
        });
      } else {
        const updatedArticle = await Article.findByIdAndUpdate(
          articleId,
          {
            title: fields.title[0],
            content: fields.content[0],
          },
          { new: true }
        );

        return res.status(200).json({
          success: true,
          message: "Article saved successfully",
          updatedArticle,
        });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { uploadArticle, getArticles, deleteArticle, getArticle, updateArticle };
