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
      return next(error);
    }
  },
  signin: async (req, res, next) => {
    try {
      console.log("here");
      let { username, password } = req.body;
      console.log(username, password);
      const account = await accountModel.findOne({ username: username });
      if (!account) {
        const error = new Error("Account  not exits");
        error.statusCode = 404;
        return next(error);
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
        const error = new Error("incorrect password");
        error.statusCode = 403;
        return next(error);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  refresh: async (req, res, next) => {
    const refreshToken = req.headers["authorization"].split(" ")[1];
    if (!refreshToken) {
      const error = new Error("refresh token is required for authentication");
      error.statusCode = 404;
      return next(error);
    }
    try {
      console.log(refreshToken + "ii");
      const decoded = jwt.verify(
        String(refreshToken),
        process.env.REFRESH_TOKEN
      );
      if (!decoded) {
        const error = new Error("Invalid token");
        error.statusCode = 401;
        return next(error);
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
      return next(error);
    }
  },
};

export default accountController;
