import express from "express";
import categoryControllers from "../controllers/category.js";
import { auth } from "../middleware/validAccount.js";
const router = express.Router();
router.use(auth);

router.get("/", categoryControllers.get);
router.post("/", categoryControllers.post);
export default router;
