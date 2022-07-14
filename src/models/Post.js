import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Post = new Schema(
  {
    id: Schema.ObjectId,
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    username: {
      type: String,
      default: "Anonymous",
      required: true,
    },
    author: {
      type: String,
      default: "Anonymous",
      required: true,
    },
    category: {
      type: String,
      default: "ALL",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", Post);
