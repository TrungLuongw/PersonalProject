import express from "express";
import accountController from "../controllers/account.js";
const router = express.Router();

router.post("/signup", accountController.signup);
router.post("/signin", accountController.signin);
router.post("/refresh", accountController.refresh);

export default router;
