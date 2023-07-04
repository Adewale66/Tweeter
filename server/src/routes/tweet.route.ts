import express from "express";
import {
  createTweet,
  getAllTweets,
  getTweet,
  interactTweet,
} from "../controllers/tweet.controller";
import asyncHandler from "express-async-handler";
import { makeComment } from "../controllers/comment.controller";
import { upload } from "../utils/config";
import { validateTweetImage } from "../middleware/imageMiddleware";
import {
  createTweetApiLimiter,
  updateTweetApiLimiter,
} from "../middleware/ratelimitmiddleware";
import getAccessToken from "../middleware/requiresToken";

const tweetRouter = express.Router();

tweetRouter.get("/", asyncHandler(getAllTweets));
tweetRouter.get("/:id", asyncHandler(getTweet));

tweetRouter.use(getAccessToken);
tweetRouter.post(
  "/",
  createTweetApiLimiter,
  upload.single("file"),
  asyncHandler(validateTweetImage),
  asyncHandler(createTweet)
);
tweetRouter.post(
  "/:id/comment",
  updateTweetApiLimiter,
  asyncHandler(makeComment)
);
tweetRouter.patch(
  "/:postId/interact",
  updateTweetApiLimiter,
  asyncHandler(interactTweet)
);

export default tweetRouter;
