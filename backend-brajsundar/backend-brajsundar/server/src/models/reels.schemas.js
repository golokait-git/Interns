import mongoose from "mongoose";


const reelSchema =  mongoose.Schema(
  {
    reelName: {
      type: String,
      required: [true, "ReelName is required"]
    },
    url: {
      type: String,
      required: [true, "Url is required"],
    },
    reelThumbnail: {
      type: String,
      required: [true, "Thumbnail is Required"],
    },
  },
  { timestamps: true }
);

const Reel = mongoose.model("reels", reelSchema);

export default Reel;