import bcrypt from "bcrypt";
import User from "../models/users";
import { RequestHandler } from "express";

/**
 * @desc Create a user
 * @route POST /
 * @access Public
 */

const CreateUser: RequestHandler = async (req, res) => {
  const { name, username, password } = req.body;
  if (!name || !username || !password)
    return res.status(400).json({ message: "Please fill all fields" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    name,
    username,
    hashedPassword,
  });

  const savedUser = await user.save();
  res.status(201).json(savedUser);
};

/**
 * @desc get a particular user
 * @route GET /id
 * @access Public
 */

const getUser: RequestHandler = async (req, res) => {
  const user = await User.findOne({ username: req.params.id })
    .populate({
      path: "tweets.tweet",
      populate: {
        path: "madeBy",
        model: "User",
        select: "username profileimage name",
      },
    })
    .populate({
      path: "tweets.tweet",
      populate: {
        path: "comments",
        populate: {
          path: "madeBy",
          model: "User",
          select: "username profileimage name",
        },
      },
    })
    .populate({
      path: "followers",
      select: "username profileimage _id name",
    })
    .populate({
      path: "following",
      select: "username profileimage _id name",
    });

  if (user === null) return res.status(404).json({ message: "User not found" });
  res.status(200).json(user);
};

/**
 * @desc get all users
 * @route GET /
 * @access Public
 */

const getAllUsers: RequestHandler = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};

/**
 * @desc delete  user
 * @route DELETE /
 * @access Private
 */

const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.user.id);
  res.status(200).json({ message: "User deleted" });
  //remove cookie
};

/**
 * @desc follow another user
 * @route POST /userId/follow
 * @access Private
 */

const followUser = async (req, res) => {
  const userId = req.params.id;

  if (userId === req.user.id)
    return res.status(400).json({ message: "You can't follow yourself" });

  const followedUser = await User.findById(userId);

  const followingUser = await User.findById(req.user.id);

  if (followingUser.following.map((id) => id.toString()).includes(userId))
    return res
      .status(400)
      .json({ message: "You are already following this user" });

  followedUser.followers.push(req.user.id);
  await followedUser.save();

  followingUser.following.push(userId);
  await followingUser.save();

  res.status(200).json({ message: "User Followed" });
};

/**
 * @desc follow another user
 * @route POST /userId/follow
 * @access Private
 */

const unFollowUser = async (req, res) => {
  const userId = req.params.id;

  if (userId === req.user.id)
    return res.status(400).json({ message: "You can't unfollow yourself" });

  const followedUser = await User.findById(userId);

  const followingUser = await User.findById(req.user.id);

  if (!followingUser.following.map((id) => id.toString()).includes(userId))
    return res.status(400).json({ message: "You are not following this user" });

  followedUser.followers = followedUser.followers.filter(
    (t) => t._id.toString() !== followingUser._id.toString()
  );
  await followedUser.save();
  followingUser.following = followingUser.following.filter(
    (t) => t._id.toString() !== followedUser._id.toString()
  );
  await followingUser.save();

  return res.status(200).json({ message: "User Unfollowed" });
};

/**
 * @desc update user
 * @route PUT /
 * @access Private
 */

const updateUser = async (req, res) => {
  const { name, description } = req.body;
  const authHeader = req.headers["authorization"];
  const access_token = authHeader && authHeader.split(" ")[1];
  if (!name) return res.status(400).json({ message: "Name can not be empty" });

  let profileimage = "";
  let bannerImage = "";

  if (Object.keys(req.files).length > 0) {
    if (req.files["profile"])
      profileimage = `${req.protocol}://${req.get("host")}/uploads/${
        req.files["profile"][0].filename
      }`;
    if (req.files["banner"])
      bannerImage = `${req.protocol}://${req.get("host")}/uploads/${
        req.files["banner"][0].filename
      }`;
  }

  const user = await User.findById(req.user.id);
  user.name = name;
  user.description = description;
  user.profileimage = profileimage ? profileimage : user.profileimage;
  user.bannerImage = bannerImage ? bannerImage : user.bannerImage;

  await user.save();
  res.status(200).json({
    id: user._id,
    name: user.name,
    username: user.username,
    access_token: access_token,
    image: user.profileimage,
  });
};

export {
  CreateUser,
  getUser,
  getAllUsers,
  deleteUser,
  followUser,
  unFollowUser,
  updateUser,
};
