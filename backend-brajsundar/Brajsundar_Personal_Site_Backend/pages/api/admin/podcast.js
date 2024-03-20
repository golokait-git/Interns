import Podcast from "lib/models/podcast";
import { connect } from "lib/db";
connect();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { page = 1, limit = 10, search = "" } = req.query;
      const filters = {};
      if (search) {
        filters.name = { $regex: new RegExp(search, "i") };
      }
      const skip = Math.max(0, (page - 1) * limit);

      const Podcasts = await Podcast.find(filters)
        .skip(skip)
        .limit(parseInt(limit));

      const totalPodcast = await Podcast.countDocuments(filters);

      return res.status(200).json({
        message: "All podcast ",
        Podcasts,
        totalPodcast,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "GET") {
    try{

      const {category} = req.query;
      const findPodcast = await Podcast.find({category});
      return res.status(200).json({
        message: "podcast successfully",
        findPodcast,
      });

    }catch(error){
      res.status(500).json({
        message: "Internal Server Error",
        error: error,
      });

    }
  } else if (req.method === "POST") {
    try {
      const { podcast_id, category } = req.body;

      if (!podcast_id) {
        throw new Error("Invalid")
      }

      const newPodcast = new Podcast({ podcast_id, category })
      const updatePodcast = await newPodcast.save()

      res.status(200).json({
        message: "Podcast Category added successfully",
        updatePodcast

      });
    } catch (error) {

      res.status(500).json({
        message: "Internal Server Error",
        error: error,
      });
    }
  } else if (req.method === "DELETE") {
    try {

      const { id } = req.query;

      const deletePodcast = await Podcast.findOneAndDelete({ _id: id })


      res.status(200).json({
        message: "Deleted successfully",
        deletePodcast
      });
    } catch (error) {
      console.error("Error: Deleting Podcast, ", error.sqlMessage);
      res.status(500).json({
        message: "Internal Server Error",
        error: error,
      });
    }
  }
}
