import express from "express";
import { logUser, logUserOut } from "../controllers/login.controller";
import asyncHandler from "express-async-handler";
import { getAccessToken } from "../utils/middleware";

const logRouter = express.Router();

logRouter.post("/login", asyncHandler(logUser));
logRouter.post("/logout", getAccessToken, asyncHandler(logUserOut));

export { logRouter };
