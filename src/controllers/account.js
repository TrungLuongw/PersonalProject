import accountModel from "../models/Account.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const accountController = {
  signup: async (req, res, next) => {
    try {
      const hashPw = await bcrypt.hash(req.body.password, 10);
      const newAccount = new accountModel({ ...req.body, password: hashPw });
      await newAccount.save();

      return res.status(200).json(newAccount);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },
  signin: async (req, res, next) => {
    try {
      console.log("here");
      let { username, password } = req.body;
      console.log(username, password);
      const account = await accountModel.findOne({ username: username });
      if (!account) {
        return res.status(404).json({ error: "Account not exits" });
      }
      if (await bcrypt.compare(password, account.password)) {
        const accessToken = jwt.sign(
          { username: account.username },
          process.env.ACCESS_TOKEN,
          {
            expiresIn: "1h",
          }
        );
        const refreshToken = jwt.sign(
          { username: account.username },
          process.env.REFRESH_TOKEN,
          {
            expiresIn: "1h",
          }
        );
        account.token = accessToken;
        account.save();

        return res.status(200).json({
          accessToken: accessToken,
          refreshToken: refreshToken,
          name: account.name,
          username: account.username,
        });
      } else {
        return res.status(403).json({ msg: "password wrong" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },
  refresh: async (req, res, next) => {
    const refreshToken = req.headers["authorization"].split(" ")[1];
    if (!refreshToken) {
      return res
        .status(404)
        .json({ msg: "refresh token is required for authentication" });
    }
    try {
      console.log(refreshToken + "ii");
      const decoded = jwt.verify(
        String(refreshToken),
        process.env.REFRESH_TOKEN
      );
      if (!decoded) {
        return res.status(401).json({ msg: "Invalid token" });
      }
      const account = await accountModel.findOne({
        username: decoded.username,
      });
      const accessToken = jwt.sign(
        { username: account.username },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: "1h",
        }
      );
      const newRefreshToken = jwt.sign(
        { username: account.username },
        process.env.REFRESH_TOKEN,
        {
          expiresIn: "1h",
        }
      );
      account.token = accessToken;
      account.save();
      return res.status(200).json({
        accessToken: accessToken,
        refreshToken: newRefreshToken,
        name: account.name,
        username: account.username,
      });
    } catch (error) {
      // console.log(error);
      if (error.name == "JsonWebTokenError")
        return res.status(401).json({ msg: "Invalid token" });
      return res.status(500).json({ error: error.message });
    }
  },
};

export default accountController;
