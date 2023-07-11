"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeComment = void 0;
const comment_1 = __importDefault(require("../models/comment"));
const tweet_1 = __importDefault(require("../models/tweet"));
/**
 * @desc making a comment
 * @route POST /tweets/postId/retweet
 * @access Private
 */
const makeComment = async (req, res) => {
    const id = req.params.id;
    const tweet = await tweet_1.default.findById(id);
    const { comment } = req.body;
    if (!comment)
        return res.status(400).json({ message: "Comment is required" });
    if (tweet === null)
        return res.status(404).json({ message: "Tweet not found" });
    const NewComment = new comment_1.default({
        madeBy: req.user.id,
        comment: comment,
    });
    await NewComment.save();
    tweet.comments = tweet.comments.concat(NewComment._id);
    await tweet.save();
    res.status(200).json({ message: "Comment made" });
};
exports.makeComment = makeComment;
//# sourceMappingURL=comment.controller.js.map