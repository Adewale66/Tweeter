import mongoose from "mongoose";
import request from "supertest";
import app from "../../app";
import Tweet from "../../models/tweet";
import User from "../../models/users";
import Comment from "../../models/comment";
import { MONGODB_URI } from "../../utils/config";

let token;
let id;
const url = "/api/tweet";
beforeAll(async () => {
  await mongoose.connect(MONGODB_URI);
  const res = await request(app).post("/api/login").send({
    username: "XXXXX",
    password: "XXXXXX",
  });

  const testTweet = new Tweet({
    tweet: "hello",
    madeBy: "648f0efc497900d8f0a2fcec",
    timeMade: new Date(),
    image: "",
  });
  const saved = await testTweet.save();
  id = saved._id.toString();
  token = res.headers["set-cookie"];
});
