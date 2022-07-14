import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { connect } from "./src/config/dbConfig.js";
import accountRouter from "./src/routers/account.router.js";
import categoryRouter from "./src/routers/category.router.js";
import postRouter from "./src/routers/post.router.js";
import commentRouter from "./src/routers/comment.router.js";
import likeRouter from "./src/routers/like.router.js";
import uploadRouter from "./src/routers/upload.router.js";
dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
connect();
app.use("/images", express.static("static/images"));
const PORT = process.env.PORT || 5000;
app.use("/", accountRouter);
app.use("/upload", uploadRouter);
app.use("/category", categoryRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);
app.use("/like", likeRouter);
app.listen(PORT, () => {
  console.log("server is listening on port " + PORT);
});
