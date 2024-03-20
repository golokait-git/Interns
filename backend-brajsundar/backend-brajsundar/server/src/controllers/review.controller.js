import Review from "../models/review.schema.js";
const uploadReview = async (req, res) => {
    try {
      const { name, message, book } = req.body;
  
      if (!name || !message|| !book) {
        throw new Error("All fields needed");
      }
  
      const review = new Review({
        name, message, book 
      });
  
      const newReview = await review.save();
  
      return res.status(200).json({
        success: true,
        message: "Review saved successfully",
        data: newReview,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  const getReviews = async (req, res) => {
    try {
      const allReview = await Review.find();
  
      res.status(200).json({
        success: true,
        data: allReview,
        message: "Get all Reels",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };


  const deleteReview = async (req, res) => {
    try {
      const reviewId = req.params.id;
  
      const reel = await Review.findById(reviewId);
      if (!reel) res.status(400).json({ message: "No reel with tha id ", error: error });
  
      try {
  
        await Review.findByIdAndDelete(reviewId)
        res.status(200).json({ message: "review deleted", data: reel })
      } catch (error) {
        res.status(400).json({ message: "cannot delete the review", error: error })
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  const getReview = async (req, res) => {
    try {
      const reviewId = req.params.id;
  
  
      const findReview= await Review.findById(reviewId);
  
      if (!findReview) {
        return res.status(404).json({
          message: "Review not found"
        });
      }
  
      return res.status(200).json({
        message: "Find Review By Id",
        findReview
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  const updateReview = async(req,res)=>{
    try {
      const id = req.query.id;
      const { name, message, book } = req.body;
      const updatedReview = await Review.findByIdAndUpdate(
        id,
        { name, message, book},
        { new: true }
      );

      return res.status(200).json({
        message: "Review updated successfully",
        updatedReview,
      });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
  const getReviewsByBookId = async (req, res) => {
    try {
      const bookId = req.params.bookId;
  
      const reviews = await Review.find({ book: bookId });
  
      res.status(200).json({
        success: true,
        data: reviews,
        message: "Get reviews by bookId",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };


  export {uploadReview, getReviews, deleteReview, getReview,updateReview,getReviewsByBookId}