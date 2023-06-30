import express from "express";
import {
  createTweet,
  getAllTweets,
  getTweet,
  interactTweet,
} from "../controllers/tweet.controller";
import asyncHandler from "express-async-handler";
import { getAccessToken } from "../middleware/middleware";
import { makeComment } from "../controllers/comment.controller";
import { upload } from "../utils/config";

const tweetRouter = express.Router();

tweetRouter.get("/", asyncHandler(getAllTweets));
tweetRouter.get("/:id", asyncHandler(getTweet));

tweetRouter.use(getAccessToken);
tweetRouter.post("/", upload.single("file"), asyncHandler(createTweet));
tweetRouter.post("/:id/comment", asyncHandler(makeComment));
tweetRouter.patch("/:postId/interact", asyncHandler(interactTweet));

export default tweetRouter;
