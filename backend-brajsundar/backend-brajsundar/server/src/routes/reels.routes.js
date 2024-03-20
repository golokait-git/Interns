import { Router } from "express";
import { getReels, uploadReel, deleteReel ,getReel,updateReel} from "../controllers/reels.controller.js";

const router = Router();

router.post("/uploadReel",uploadReel)
router.get("/getReels",getReels)
router.delete("/deleteReel/:id",deleteReel)
router.get("/getReel/:id",getReel)
router.put("/updateReel/:id",updateReel)

export default router;
