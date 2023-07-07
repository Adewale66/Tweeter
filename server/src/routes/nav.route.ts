import express from "express";
import asyncHandler from "express-async-handler";
import { getRefreshToken } from "../middleware/Token";
import {
  getExploreTweets,
  getHomeTweets,
  getSavedTweets,
} from "../controllers/nav.controller";

const navRouter = express.Router();

navRouter.get("/explore", asyncHandler(getExploreTweets));
navRouter.use(getRefreshToken);

navRouter.get("/home", asyncHandler(getHomeTweets));

navRouter.get("/bookmarks", asyncHandler(getSavedTweets));

export default navRouter;
