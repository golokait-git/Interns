import { Router } from "express";
const router = Router();
import { uploadReview, getReviews, deleteReview, getReview, updateReview, getReviewsByBookId } from "../controllers/review.controller.js";



router.post("/uploadReview", uploadReview)
router.get("/getReviews", getReviews)
router.get("/getReview/:id", getReview)
router.delete("/deleteReview/:id", deleteReview)
router.put("/update/:id", updateReview)
router.get("/byBook/:bookId", getReviewsByBookId)


export default router;
