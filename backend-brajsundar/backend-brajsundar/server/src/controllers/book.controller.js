import Book from "../models/books.schema.js";
import fs from "fs";
import { s3FileUpload, s3FileDelete } from "../services/imageUploader.js";
import formidable from "formidable";
import mongoose from "mongoose";

const uploadBook = async (req, res) => {
  const form = formidable({ multiples: false, keepExtensions: true });
  try {
    form.parse(req, async function (err, fields, files) {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      const bookId = new mongoose.Types.ObjectId().toHexString();

      const thumbnailFile = files.bookThumbnail[0];

      const data = await fs.readFileSync(thumbnailFile.filepath);

      const upload = await s3FileUpload({
        bucketName: process.env.S3_BUCKET_NAME,
        key: `Images/Book/${bookId}/thumbnail_1.png`,
        body: data,
        contentType: thumbnailFile.mimetype,
      });

      const createBook = await Book.create({
        _id: bookId,
        bookName: fields.bookName[0],
        bookLink: fields.bookLink[0],
        bookDetail: fields.bookDetail[0],
        country: fields.country[0],
        preBook: fields.preBook[0],
        bookThumbnail: `https://d2lnag86znkprh.cloudfront.net/Images/Book/${bookId}/thumbnail_1.png`,
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
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    if (books.length === 0) {
      res.status(404).json({
        message: "Book not found",
      });
    } else {
      res.status(200).json({
        message: "Books Found",
        data: books,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error });
    console.log(error);
  }
};

const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404).json({
        message: "Book not found",
      });
    } else {
      res.status(200).json({
        message: "Book Found",
        data: book,
      });
    }
  } catch (error) {
    res.status(404).json({ error: error });
    console.log(error);
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book)
      res.status(400).json({ message: "No book with that id", error: error });

    try {
      const url = book.bookThumbnail;

      const s3KeyArr = url.split(".net/");

      const s3Key = s3KeyArr[1];

      await s3FileDelete({
        bucketName: process.env.S3_BUCKET_NAME,
        key: s3Key,
      });

      await Book.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json({ message: "Book Deleted Successfully", data: book });
    } catch (error) {
      res.status(400).json({ message: "Cannot Delete the Book", error: error });
    }
  } catch (error) {
    res.status(404).json({ error: error });
    console.log(error);
  }
};

const updateBook = async (req, res) => {
  const form = formidable({ multiples: false, keepExtensions: true });
  try {
    const bookId = req.params.id;
    
   
    form.parse(req, async function (err, fields, files) {
      if (err) {
        return res.status(400).json({ error: "Error parsing form data" });
      }

      if (files.bookThumbnail) {
        const bookThumb = await Book.findById(bookId);

        const url = bookThumb.bookThumbnail;

        const s3KeyArr = url.split(".net/");

        const s3Key = s3KeyArr[1];

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

        const thumbnailFile = files.bookThumbnail[0];

        const data = await fs.readFileSync(thumbnailFile.filepath);

        const upload = await s3FileUpload({
          bucketName: process.env.S3_BUCKET_NAME,
          key: newUrl ? newUrl : s3Key,
          body: data,
          contentType: thumbnailFile.mimetype,
        });
        console.log(s3Key);
        const UpdateBook = await Book.findByIdAndUpdate(
          bookId,
          {
            bookName: fields.bookName[0],
            bookLink: fields.bookLink[0],
            bookDetail: fields.bookDetail[0],
            country: fields.country[0],
            preBook: fields.preBook[0],
            bookThumbnail: `https://d2lnag86znkprh.cloudfront.net/${
              newUrl ? newUrl : s3Key
            }`,
          },
          { new: true }
        );

        return res.status(200).json({
          message: "Book created successfully",
          UpdateBook,
        });
      } else {
        const UpdateBook = await Book.findByIdAndUpdate(
          bookId,
          {
            bookName: fields.bookName[0],
            bookLink: fields.bookLink[0],
            bookDetail: fields.bookDetail[0],
            country: fields.country[0],
            preBook: fields.preBook[0],
          },
          { new: true }
        );

        return res.status(200).json({
          message: "Book created successfully",
          UpdateBook,
        });
      }
    });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { uploadBook, getBooks, getBook, deleteBook, updateBook };