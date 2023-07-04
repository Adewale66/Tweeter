import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/users";
import { RequestHandler } from "express";

/**
 * @desc log a user in
 * @route POST /login
 * @access Public
 */

const logUser: RequestHandler = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "Missing email or password" });

  const user = await User.findOne({ username }).collation({
    locale: "en",
    strength: 2,
  });
  if (!user) return res.status(400).json({ message: "User not found" });
  const { hashedPassword } = user;
  const correctPassword = await bcrypt.compare(password, hashedPassword);
  if (!correctPassword)
    return res.status(400).json({ message: "Invalid Crendentials" });

  const tokenUser = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(tokenUser, process.env.TOKEN_SECRET, {
    expiresIn: "2h",
  });

  res
    .status(200)
    .cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 60 * 60,
    })
    .json({
      id: user._id,
      name: user.name,
      username: user.username,
    });
};

/**
 * @desc log a user out
 * @route GET /logout
 * @access Private
 */

const logUserOut: RequestHandler = async (req, res) => {
  res
    .clearCookie("access_token", {
      httpOnly: true,
      expires: new Date(0),
    })
    .status(200)
    .json({ message: "success" });
};

export { logUser, logUserOut };
