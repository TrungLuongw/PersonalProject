import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "static/images");
  },
  filename: (req, file, cb) => {
    const identity = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, identity + "-" + file.originalname);
  },
});
const filter = (req, file, cb) => {
  let splitName = String(file.originalname).split(".");
  let typeFile = splitName[splitName.length - 1];
  const acceptType = ["jpg", "png", "jpeg"];
  if (!acceptType.includes(typeFile)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(null, false);
  }
  cb(null, true);
};
export default multer({ storage: storage, fileFilter: filter });
