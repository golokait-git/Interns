import mongoose from "mongoose";
const { Schema } = mongoose;

//Defining  Schema
const podcastSchema = new Schema(
  {
    podcast_id: {
      type: String,
      require:true
    },
    category:{
        type:String
    }
  },
  { timestamps: true }
);

//creating a model
const Podcast = mongoose.models.podcast || mongoose.model("podcast", podcastSchema);

export default Podcast;