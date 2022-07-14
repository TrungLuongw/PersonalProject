import express from "express";
import categoryControllers from "../controllers/category.js";
const router = express.Router();

router.get("/", categoryControllers.get);
router.post("/", categoryControllers.post);
export default router;
