import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Comment = new Schema(
  {
    id: {
      type: Schema.ObjectId,
    },
    comment: {
      type: String,
      required: true,
    },
    postId: {
      type: Schema.ObjectId,
      ref: "Post",
      required: true,
    },
    username: {
      type: String,
      default: "anonymous",
      required: true,
    },
    name: {
      type: String,
      default: "anonymous",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Comment", Comment);
