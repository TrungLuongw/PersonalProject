import express from "express";
import upload from "../../utils/upload.js";
import { auth } from "../middleware/validAccount.js";
import multer from "multer";
const router = express.Router();
router.post("/", auth, upload.single("file"), (req, res, next) => {
  if (req.fileValidationError) {
    return res.status(403).json({ msg: req.fileValidationError });
  } else if (!req.file) {
    return res.status(404).json({ msg: "File not found" });
  }
  console.log(req.file);
  return res.status(200).json({ filename: req.file.filename });
});
export default router;
