import express from "express";
import { auth } from "../middleware/validAccount.js";
import postController from "../controllers/post.js";
const router = express.Router();
//use midleware
router.use(auth);

router.get("/", postController.getPosts);
router.get("/:id", postController.getPost);
router.post("/", postController.publicPost);
router.put("/:id", postController.putPost);
router.delete("/:id", postController.deletePost);
export default router;
