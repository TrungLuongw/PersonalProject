import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
async function connect() {
  try {
    await mongoose.connect(process.env.DBSTR, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect successfully !");
  } catch (error) {
    console.log("Connect failure !");
  }
}

export { connect };
