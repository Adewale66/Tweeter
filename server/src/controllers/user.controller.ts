import bcrypt from "bcrypt";
import User from "../models/users";

/**
 * @desc Create a user
 * @route POST /
 * @access Public
 */

const CreateUser = async (req, res) => {
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

const getUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id).populate([
    "tweets",
    "likes",
    "followers",
    "following",
    "retweets",
    "comments",
    "saved",
  ]);
  if (user === null) return res.status(404).json({ message: "User not found" });
  res.status(200).json(user);
};

/**
 * @desc get all users
 * @route GET /
 * @access Public
 */

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};

/**
 * @desc delete a particular user
 * @route DELETE /
 * @access Private
 */

const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.user.id);
  res.status(200).json({ message: "User deleted" });
};

/**
 * @desc follow another user
 * @route PATCH /userId/follow
 * @access Private
 */

const followUser = async (req, res) => {
  const userId = req.params.id;

  if (userId === req.user.id)
    return res.status(400).json({ message: "You can't follow yourself" });

  const followedUser = await User.findById(userId);

  const followingUser = await User.findById(req.user.id);

  if (followingUser.following.map((id) => id.toString()).includes(userId)) {
    followedUser.followers = followedUser.followers.filter(
      (id) => id.toString() !== req.user.id
    );
    await followedUser.save();

    followingUser.following = followingUser.following.filter(
      (id) => id.toString() !== userId
    );
    await followingUser.save();
  } else {
    followedUser.followers.push(req.user.id);
    await followedUser.save();

    followingUser.following.push(userId);
    await followingUser.save();
  }

  res.status(200).json({ message: "User followed" });
};

/**
 * @desc upload images
 * @route POST /upload
 * @access Private
 */

const uploadImage = async (req, res) => {
  const { image } = req.body;

  const user = await User.findById(req.user.id);

  if (user === null) return res.status(404).json({ message: "User not found" });

  user.images = [...user.images, { url: image, timeMade: new Date() }];
  await user.save();

  res.status(200).json({ message: "Image uploaded" });
};

/**
 * @desc update user
 * @route PUT /
 * @access Private
 */

const updateUser = async (req, res) => {
  const { profileimage, bannerImage, description } = req.body;
  const user = await User.findByIdAndUpdate(req.user.id, {
    profileimage,
    description,
    bannerImage,
  });

  await user.save();
  res.status(200).json({ message: "User updated" });
};

export {
  CreateUser,
  getUser,
  getAllUsers,
  deleteUser,
  followUser,
  uploadImage,
  updateUser,
};
