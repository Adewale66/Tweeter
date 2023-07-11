"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSavedTweets = exports.getExploreTweets = exports.getHomeTweets = void 0;
const users_1 = __importDefault(require("../models/users"));
const tweet_1 = __importDefault(require("../models/tweet"));
const homeTweets_1 = require("../utils/homeTweets");
/**
 * @desc get home tweets
 * @route GET /home
 * @access Private
 */
const getHomeTweets = async (req, res) => {
    const user = await users_1.default.findById(req.user.id);
    const users = await users_1.default.find({
        _id: { $in: [...user.following, user._id] },
    })
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
    });
    const tweets = (0, homeTweets_1.sortTweets)(users, req);
    return res.status(200).json(tweets);
};
exports.getHomeTweets = getHomeTweets;
/**
 * @desc get explore tweets
 * @route GET /explore
 * @access Public
 */
const getExploreTweets = async (req, res) => {
    const tweets = await tweet_1.default.find({})
        .populate({
        path: "madeBy",
        model: "User",
        select: "username profileimage name",
    })
        .populate({
        path: "comments",
        populate: {
            path: "madeBy",
            model: "User",
            select: "username profileimage name",
        },
    });
    return res.status(200).json(tweets);
};
exports.getExploreTweets = getExploreTweets;
/**
 * @desc get saved tweets
 * @route GET /bookmarks
 * @access Private
 */
const getSavedTweets = async (req, res) => {
    const user = await users_1.default.findById(req.user.id)
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
    });
    const tweets = user.tweets.filter((t) => t.saved);
    return res.status(200).json(tweets);
};
exports.getSavedTweets = getSavedTweets;
//# sourceMappingURL=nav.controller.js.map