import mongoose from "mongoose";
const { Schema } = mongoose;

//Defining  Schema
const reelSchema = new Schema(
  {
    reelName: {
      type: String,
    },
    url: {
      type: String,
      required: true,
    },
    reelpath: {
      type: String,
    },
  },
  { timestamps: true }
);

//creating a model
const Reel = mongoose.models.reels || mongoose.model("reels", reelSchema);

export default Reel;
