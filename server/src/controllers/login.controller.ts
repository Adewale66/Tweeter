import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/users";

/**
 * @desc log a user in
 * @route POST /login
 * @access Public
 */

const logUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "Missing email or password" });

  const user = await User.findOne({ username });
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
    expiresIn: 60 * 60,
  });

  res
    .cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60,
    })
    .status(200)
    .json({
      id: user._id,
      name: user.name,
      username: user.username,
    });
};

/**
 * @desc log a user out
 * @route POST /logout
 * @access Private
 */

const logUserOut = async (req, res) => {
  res
    .cookie("access_token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .status(200)
    .json({ message: "success" });
};

export { logUser, logUserOut };
