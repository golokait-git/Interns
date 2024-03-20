import { Router } from "express";
const router = Router();
import bookRoutes from "../routes/books.routes.js";
import reelRoutes from "./../routes/reels.routes.js";
import reviewRouter from "./../routes/review.routes.js";
import youtubeRouter from "./../routes/youtube.routes.js";
import articleRouter from "./article.routes.js";

router.use("/reels", reelRoutes);
router.use("/reviews", reviewRouter);
router.use("/youtube", youtubeRouter);
router.use("/books", bookRoutes);
router.use("/articles", articleRouter);

export default router;
