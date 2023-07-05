import express from "express";
import {
  CreateUser,
  getUser,
  getAllUsers,
  deleteUser,
  followUser,
  updateUser,
  unFollowUser,
} from "../controllers/user.controller";
import asyncHandler from "express-async-handler";
import getAccessToken from "../middleware/Token";
import { upload } from "../utils/config";
import { validateProfileChange } from "../middleware/imageMiddleware";
import {
  updateProfileApiLimiter,
  followUserApiLimiter,
} from "../middleware/ratelimitmiddleware";

const userRouter = express.Router();

userRouter.get("/:id", asyncHandler(getUser));

userRouter.get("/", asyncHandler(getAllUsers));

userRouter.post("/", asyncHandler(CreateUser));

userRouter.use(getAccessToken);

userRouter.put(
  "/",
  upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "profile", maxCount: 1 },
  ]),
  asyncHandler(validateProfileChange),
  // updateProfileApiLimiter,
  asyncHandler(updateUser)
);
userRouter.delete("/", asyncHandler(deleteUser));

// userRouter.use(followUserApiLimiter);

userRouter.post("/:id/follow", asyncHandler(followUser));

userRouter.post("/:id/unfollow", asyncHandler(unFollowUser));

export default userRouter;
