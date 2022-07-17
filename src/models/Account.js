import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Account = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Account", Account);
