import Account from "../models/Account.js";
import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  if (!String(req.headers["authorization"]).startsWith("Bearer")) {
    return res.status(401).json({ msg: "please log in to get access token!" });
  }
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
