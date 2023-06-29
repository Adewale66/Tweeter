import express from "express";
import asyncHandler from "express-async-handler";
import { getAccessToken } from "../utils/middleware";
import {
  getExploreTweets,
  getHomeTweets,
  getSavedTweets,
} from "../controllers/nav.controller";

const navRouter = express.Router();

navRouter.get("/home", getAccessToken, asyncHandler(getHomeTweets));
navRouter.get("/explore", asyncHandler(getExploreTweets));
navRouter.get("/bookmarks", getAccessToken, asyncHandler(getSavedTweets));

export default navRouter;
