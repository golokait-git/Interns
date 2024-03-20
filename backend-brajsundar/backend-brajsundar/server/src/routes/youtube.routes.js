// routes/videoRoutes.js
import { Router } from "express";
const router = Router();
import { getAllVideos, getVideoById, createVideo, updateVideo, deleteVideo } from "../controllers/youtube.controller.js";

// Get all videos
router.get('/videos', getAllVideos);

// Get a specific video
router.get('/videos/:id', getVideoById);

// Create a new video
router.post('/createVideo', createVideo);

// Update a video
router.put('/videos/:id', updateVideo);

// Delete a video
router.delete('/videos/:id', deleteVideo);

export default router;
