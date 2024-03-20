import { Router } from "express";
import { uploadBook, getBooks, getBook, deleteBook, updateBook } from "../controllers/book.controller.js";
const router = Router();

router.post("/uploadBook", uploadBook);
router.get("/getBooks", getBooks);
router.get("/getBooks/:id", getBook);
router.delete("/deleteBook/:id", deleteBook);
router.put("/updateBook/:id", updateBook);


export default router;