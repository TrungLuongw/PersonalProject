import express from "express";
import { auth } from "../middleware/validAccount.js";
import postController from "../controllers/post.js";
const router = express.Router();

router.get("/", auth, postController.getPosts);
router.get("/:id", auth, postController.getPost);
router.post("/", auth, postController.publicPost);
router.put("/:id", auth, postController.putPost);
router.delete("/:id", auth, postController.deletePost);
export default router;
