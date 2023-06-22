import express from "express";
import {
  createTweet,
  getAllTweets,
  getTweet,
  likeTweet,
  retweetTweet,
  saveTweet,
} from "../controllers/tweet.controller";
import asyncHandler from "express-async-handler";
import { getAccessToken } from "../utils/middleware";
import { makeComment } from "../controllers/comment.controller";

const tweetRouter = express.Router();

tweetRouter.get("/", asyncHandler(getAllTweets));
tweetRouter.get("/:id", asyncHandler(getTweet));

tweetRouter.use(getAccessToken);
tweetRouter.post("/", asyncHandler(createTweet));
tweetRouter.patch("/:postId/like", asyncHandler(likeTweet));
tweetRouter.patch("/:postId/retweet", asyncHandler(retweetTweet));
tweetRouter.patch("/:postId/save", asyncHandler(saveTweet));
tweetRouter.post("/:id/comment", asyncHandler(makeComment));

export default tweetRouter;
