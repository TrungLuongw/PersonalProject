import express from "express";
import commentController from "../controllers/comment.js";
import { auth } from "../middleware/validAccount.js";
const router = express.Router();
router.get("/:id", auth, commentController.getComment);
router.post("/", auth, commentController.publicComment);
router.delete("/:id", auth, commentController.deleteComment);
export default router;
