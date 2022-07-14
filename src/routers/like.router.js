import express from "express";
import likeController from "../controllers/like.js";
import { auth } from "../middleware/validAccount.js";

const router = express.Router();
router.get("/:postId", auth, likeController.getLikes);
router.post("/", auth, likeController.publicLike);
router.delete("/:id", auth, likeController.deleteLike);

export default router;
