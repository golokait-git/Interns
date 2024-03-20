import mongoose from "mongoose";
const { Schema } = mongoose;

//Defining book Schema
const reviewSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    BookId: {
      type: String,
    },
    fileName: {
      type: String,
    },
  },
  { timestamps: true }
);

//creating a model

const Review =
  mongoose.models.reviews || mongoose.model("reviews", reviewSchema);

export default Review;
