import express from "express";
import likeController from "../controllers/like.js";
import { auth } from "../middleware/validAccount.js";

const router = express.Router();
router.use(auth);

router.get("/:postId", likeController.getLikes);
router.post("/", likeController.publicLike);
router.delete("/:id", likeController.deleteLike);

export default router;
