import express from "express";
import accountController from "../controllers/account.js";
import { validSignupInput } from "../middleware/validAccount.js";
const router = express.Router();

router.post("/signup", validSignupInput, accountController.signup);
router.post("/signin", accountController.signin);
router.post("/refresh", accountController.refresh);

export default router;
