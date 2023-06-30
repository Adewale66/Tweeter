import express from "express";
import asyncHandler from "express-async-handler";
import { getAccessToken } from "../middleware/middleware";
import {
  getExploreTweets,
  getHomeTweets,
  getSavedTweets,
} from "../controllers/nav.controller";

const navRouter = express.Router();
navRouter.use(getAccessToken);
navRouter.get("/home", asyncHandler(getHomeTweets));
navRouter.get("/explore", asyncHandler(getExploreTweets));
navRouter.get("/bookmarks", asyncHandler(getSavedTweets));

export default navRouter;
