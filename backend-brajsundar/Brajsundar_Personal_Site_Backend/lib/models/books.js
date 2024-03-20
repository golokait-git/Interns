import mongoose from "mongoose";
import PreBook from "../../config/index";
const bookSchema = new mongoose.Schema(
  {
    bookName: {
      type: String,
      required: true,
    },
    bookLink: {
      type: String,
      required:true
    },
    detail: {
      type: String,
    },
    country: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    prebook: {
      type: String,
      enum: Object.values(PreBook),
      default: PreBook.NO,
    },
  },
  { timestamps: true }
);

const Book = mongoose.models.books || mongoose.model("books", bookSchema);

export default Book;
