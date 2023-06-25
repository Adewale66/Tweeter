import express from "express";
import { checkToken } from "../controllers/checkToken.controller";
import { getAccessToken } from "../utils/middleware";
import asyncHandler from "express-async-handler";

const tokenRouter = express.Router();

tokenRouter.get("/checkToken", getAccessToken, asyncHandler(checkToken));

export default tokenRouter;
