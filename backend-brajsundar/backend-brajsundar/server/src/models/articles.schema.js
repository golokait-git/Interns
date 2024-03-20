import mongoose from "mongoose";

const articleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 255,
    },
    content: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,

    },
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", articleSchema);

export default Article;
