import { Router } from "express";
import { uploadArticle , getArticles ,deleteArticle ,updateArticle ,getArticle } from "../controllers/article.controller.js";
const router = Router();

router.post("/uploadArticle", uploadArticle);
router.get("/getArticles",  getArticles );
router.delete("/deleteArticle/:id",deleteArticle )
router.get("/getArticle/:id",getArticle )
router.put("/updateArticle/:id",updateArticle)


export default router;