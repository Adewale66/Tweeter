import express from "express";
import { logUser, logUserOut } from "../controllers/login.controller";
import asyncHandler from "express-async-handler";
import getAccessToken from "../middleware/requiresToken";
import { loginApiLimiter } from "../middleware/ratelimitmiddleware";

const logRouter = express.Router();

logRouter.post("/login", loginApiLimiter, asyncHandler(logUser));
logRouter.post("/logout", getAccessToken, asyncHandler(logUserOut));

export { logRouter };
