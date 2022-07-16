import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Category = new Schema(
  {
    id: {
      type: Schema.ObjectId,
    },
    name: {
      type: String,
      default: "ALL",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Category", Category);
