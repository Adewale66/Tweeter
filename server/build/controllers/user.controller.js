"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.unFollowUser = exports.followUser = exports.deleteUser = exports.getAllUsers = exports.getUser = exports.CreateUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = __importDefault(require("../models/users"));
const config_1 = require("../utils/config");
/**
 * @desc Create a user
 * @route POST /
 * @access Public
 */
const CreateUser = async (req, res) => {
    const { name, username, password } = req.body;
    if (!name || !username || !password)
        return res.status(400).json({ message: "Please fill all fields" });
    const superUser = await users_1.default.findById(config_1.superuserId);
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const user = new users_1.default({
        name,
        username,
        hashedPassword,
    });
    user.following = user.following.concat(superUser._id);
    superUser.followers = superUser.followers.concat(user._id);
    await superUser.save();
    const savedUser = await user.save();
    res.status(201).json(savedUser);
};
exports.CreateUser = CreateUser;
/**
 * @desc get a particular user
 * @route GET /id
 * @access Public
 */
const getUser = async (req, res) => {
    const user = await users_1.default.findOne({ username: req.params.id })
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
    if (user === null)
        return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
};
exports.getUser = getUser;
/**
 * @desc get all users
 * @route GET /
 * @access Public
 */
const getAllUsers = async (req, res) => {
    const users = await users_1.default.find({}).select("username profileimage name");
    res.status(200).json(users);
};
exports.getAllUsers = getAllUsers;
/**
 * @desc delete  user
 * @route DELETE /
 * @access Private
 */
const deleteUser = async (req, res) => {
    await users_1.default.findByIdAndDelete(req.user.id);
    res.status(200).json({ message: "User deleted" });
    //remove cookie
};
exports.deleteUser = deleteUser;
/**
 * @desc follow another user
 * @route POST /userId/follow
 * @access Private
 */
const followUser = async (req, res) => {
    const userId = req.params.id;
    if (userId === req.user.id)
        return res.status(400).json({ message: "You can't follow yourself" });
    const followedUser = await users_1.default.findById(userId);
    const followingUser = await users_1.default.findById(req.user.id);
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
exports.followUser = followUser;
/**
 * @desc follow another user
 * @route POST /userId/follow
 * @access Private
 */
const unFollowUser = async (req, res) => {
    const userId = req.params.id;
    if (userId === req.user.id)
        return res.status(400).json({ message: "You can't unfollow yourself" });
    const followedUser = await users_1.default.findById(userId);
    const followingUser = await users_1.default.findById(req.user.id);
    if (!followingUser.following.map((id) => id.toString()).includes(userId))
        return res.status(400).json({ message: "You are not following this user" });
    followedUser.followers = followedUser.followers.filter((t) => t._id.toString() !== followingUser._id.toString());
    await followedUser.save();
    followingUser.following = followingUser.following.filter((t) => t._id.toString() !== followedUser._id.toString());
    await followingUser.save();
    return res.status(200).json({ message: "User Unfollowed" });
};
exports.unFollowUser = unFollowUser;
/**
 * @desc update user
 * @route PUT /
 * @access Private
 */
const updateUser = async (req, res) => {
    const { name, description } = req.body;
    const authHeader = req.headers["authorization"];
    const access_token = authHeader && authHeader.split(" ")[1];
    if (!name)
        return res.status(400).json({ message: "Name can not be empty" });
    let profileimage = "";
    let bannerImage = "";
    if (Object.keys(req.files).length > 0) {
        if (req.files["profile"])
            profileimage = `${req.protocol}://${req.get("host")}/uploads/${req.files["profile"][0].filename}`;
        if (req.files["banner"])
            bannerImage = `${req.protocol}://${req.get("host")}/uploads/${req.files["banner"][0].filename}`;
    }
    const user = await users_1.default.findById(req.user.id);
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
exports.updateUser = updateUser;
//# sourceMappingURL=user.controller.js.map