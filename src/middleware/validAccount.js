import Account from "../models/Account.js";
import jwt from "jsonwebtoken";
export const validSignupInput = async (req, res, next) => {
  const username = req.body.username;
  if (!username) return res.status(400).json({ msg: "invalid username" });
  const account = await Account.findOne({ username: username });
  if (account) return res.status(409).json({ msg: "account already exists" });

  next();
};
export const auth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];
  if (!accessToken) {
    return res.status(401).json({ msg: "token is required" });
  }
  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN);
    req.username = decoded.username;
  } catch (Error) {
    return res.status(401).json({ msg: "invalid token" });
  }
  next();
};
