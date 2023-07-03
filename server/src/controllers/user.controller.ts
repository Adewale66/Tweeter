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
  const username = req.params.id;
  const user = await User.find({ username })
    .populate(["followers", "following"])
    .populate({
      path: "tweets.tweet",
      populate: {
        path: "madeBy",
        model: "User",
      },
    })
    .populate({
      path: "tweets.tweet",
      populate: {
        path: "comments",
        populate: {
          path: "madeBy",
          model: "User",
        },
      },
    });
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
 * @desc delete  user
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

  res.status(200).json({ message: "Success" });
};

/**
 * @desc update user
 * @route PUT /
 * @access Private
 */

const updateUser = async (req, res) => {
  const { username, description } = req.body;
  if (!username)
    return res.status(400).json({ message: "Username can not be empty" });
  console.log(req.files);

  console.log(req.files["profile"]);
  console.log(req.files["banner"]);

  let profileimage = "";
  let bannerImage = "";
  if (Object.keys(req.files).length > 0) {
    profileimage = `${req.protocol}://${req.get("host")}/uploads/${
      req.files["profile"][0].filename
    }`;
    bannerImage = `${req.protocol}://${req.get("host")}/uploads/${
      req.files["banner"][0].filename
    }`;
  }

  const user = await User.findByIdAndUpdate(req.user.id, {
    username,
    profileimage,
    bannerImage,
    description,
  });

  await user.save();
  res.status(200).json({ message: "User updated" });
};

export { CreateUser, getUser, getAllUsers, deleteUser, followUser, updateUser };
