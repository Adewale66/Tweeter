import express from "express";
import {
  CreateUser,
  getUser,
  getAllUsers,
  deleteUser,
  followUser,
  updateUser,
} from "../controllers/user.controller";
import asyncHandler from "express-async-handler";
import { getAccessToken } from "../middleware/middleware";
import { upload } from "../utils/config";

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
  asyncHandler(updateUser)
);
userRouter.patch("/:id/follow", asyncHandler(followUser));
userRouter.delete("/", asyncHandler(deleteUser));

export default userRouter;
