import express from "express";
import { checkToken } from "../controllers/checkToken.controller";
import getAccessToken from "../middleware/requiresToken";
import asyncHandler from "express-async-handler";

const tokenRouter = express.Router();

tokenRouter.post("/checkToken", getAccessToken, asyncHandler(checkToken));

export default tokenRouter;
