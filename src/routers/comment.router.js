import express from "express";
import commentController from "../controllers/comment.js";
import { auth } from "../middleware/validAccount.js";
const router = express.Router();
//use middleware
router.use(auth);

router.get("/:id", commentController.getComment);
router.post("/", commentController.publicComment);
router.delete("/:id", commentController.deleteComment);
export default router;
