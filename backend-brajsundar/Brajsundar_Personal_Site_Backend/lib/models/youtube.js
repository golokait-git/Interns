import mongoose from "mongoose";
const { Schema } = mongoose;

//Defining Schema
const youtubeSchema = new Schema(
  {
    video_name: {
      type: String,
      required: true,
    },
    video_url: {
      type: String,
      required: true,
    },
    video_title: {
      type: String,
    },
    videoPath: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    category: {
      type: String,
    },
  },
  { timestamps: true }
);

//creating a model

const Youtube =
  mongoose.models.Youtube || mongoose.model("Youtube", youtubeSchema);
//export model
export default Youtube;
