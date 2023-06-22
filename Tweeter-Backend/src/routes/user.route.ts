import express from "express";
import {
  CreateUser,
  getUser,
  getAllUsers,
  deleteUser,
  followUser,
  uploadImage,
  updateUser,
} from "../controllers/user.controller";
import asyncHandler from "express-async-handler";
import { getAccessToken } from "../utils/middleware";

const userRouter = express.Router();

userRouter.get("/:id", asyncHandler(getUser));
userRouter.get("/", asyncHandler(getAllUsers));
userRouter.post("/", asyncHandler(CreateUser));
userRouter.use(getAccessToken);
userRouter.post("/upload", asyncHandler(uploadImage));
userRouter.put("/", asyncHandler(updateUser));
userRouter.delete("/", asyncHandler(deleteUser));
userRouter.patch("/:id/follow", asyncHandler(followUser));

export default userRouter;
