import express from "express";
import asyncHandler from "express-async-handler";
import { getAccessToken } from "../utils/middleware";
import { getHomeTweets } from "../controllers/home.controller";

const homeRouter = express.Router();

homeRouter.get("/home", getAccessToken, asyncHandler(getHomeTweets));

export default homeRouter;
