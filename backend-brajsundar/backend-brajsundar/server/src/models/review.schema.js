import {Schema,model} from "mongoose";
const  reviewSchema = new Schema(
  {
    name: {
      type: String,
      required:[true,"Name is required"]
    },
    message: {
      type: String,
      required: [true,"Message is required"],
    },
    book: {
      type: Schema.Types.ObjectId,
      ref:"Books",
      required: true
    },
  },
  {timestamps: true}
);
const Review = model("review", reviewSchema );
export default Review;