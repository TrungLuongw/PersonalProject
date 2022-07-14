import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Like = new Schema(
  {
    id: {
      type: Schema.ObjectId,
    },
    postId: {
      type: Schema.ObjectId,
      ref: "Post",
    },
    username: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Like", Like);
