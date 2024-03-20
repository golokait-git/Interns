// models/video.js
import mongoose from "mongoose";

const videoSchema = mongoose.Schema(
  {
    videoName: {
      type: String,
      required: true,
    },
    video_url: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Video = mongoose.model("Youtube", videoSchema);

export default Video;
