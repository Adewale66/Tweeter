import express from "express";
import {
  createTweet,
  getAllTweets,
  getTweet,
  likeTweet,
  removeLike,
  createRetweet,
  deleteRetweet,
  bookmarkTweet,
  removeBookmark,
} from "../controllers/tweet.controller";
import asyncHandler from "express-async-handler";
import { makeComment } from "../controllers/comment.controller";
import { upload } from "../utils/config";
import { validateTweetImage } from "../middleware/imageMiddleware";
import {
  createTweetApiLimiter,
  updateTweetApiLimiter,
} from "../middleware/ratelimitmiddleware";
import getAccessToken from "../middleware/Token";

const tweetRouter = express.Router();

tweetRouter.get("/", asyncHandler(getAllTweets));

tweetRouter.get("/:id", asyncHandler(getTweet));

tweetRouter.use(getAccessToken);

tweetRouter.post(
  "/",

  upload.single("file"),
  asyncHandler(validateTweetImage),
  asyncHandler(createTweet)
);
// tweetRouter.use(updateTweetApiLimiter);

tweetRouter.post("/:postId/like", asyncHandler(likeTweet));

tweetRouter.post("/:postId/removeLike", asyncHandler(removeLike));

tweetRouter.post("/:postId/retweet", asyncHandler(createRetweet));

tweetRouter.post("/:postId/removeRetweet", asyncHandler(deleteRetweet));

tweetRouter.post("/:postId/bookmark", asyncHandler(bookmarkTweet));

tweetRouter.post("/:postId/removeBookmark", asyncHandler(removeBookmark));

tweetRouter.post("/:id/comment", asyncHandler(makeComment));

export default tweetRouter;
