import express from "express";
import {
  createTweet,
  getAllTweets,
  getTweet,
  interactTweet,
} from "../controllers/tweet.controller";
import asyncHandler from "express-async-handler";
import { getAccessToken } from "../utils/middleware";
import { makeComment } from "../controllers/comment.controller";

const tweetRouter = express.Router();

tweetRouter.get("/", asyncHandler(getAllTweets));
tweetRouter.get("/:id", asyncHandler(getTweet));

tweetRouter.use(getAccessToken);
tweetRouter.post("/", asyncHandler(createTweet));
tweetRouter.patch("/:postId/interact", asyncHandler(interactTweet));
tweetRouter.post("/:id/comment", asyncHandler(makeComment));

export default tweetRouter;
