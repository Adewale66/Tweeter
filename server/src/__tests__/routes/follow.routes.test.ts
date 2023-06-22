import mongoose from "mongoose";
import request from "supertest";
import app from "../../app";
import { MONGODB_URI } from "../../utils/config";
import User from "../../models/users";

let token;
let id;
beforeAll(async () => {
  await mongoose.connect(MONGODB_URI);

  const tempUser = new User({
    name: "XXX",
    username: "XXXXXX",
    hashedPassword: "XXXXXX",
  });

  await tempUser.save();
  id = tempUser._id.toString();

  const res = await request(app).post("/api/login").send({
    username: "XXXXX",
    password: "XXXXXX",
  });
  const test = await User.findById("648f0efc497900d8f0a2fcec");
  test.following = [];
  await test.save();
  token = res.headers["set-cookie"];
});

describe("following a user", () => {
  describe("when a user is not logged in", () => {
    it("should return a 401", async () => {
      await request(app).patch(`/api/user/${id}/follow`).expect(401);
    });
  });

  describe("when a user is logged in", () => {
    describe("follow user", () => {
      it("should return a 200", async () => {
        await request(app)
          .patch(`/api/user/${id}/follow`)
          .set("Cookie", token)
          .expect(200);
      });

      it("should show the user as followed", async () => {
        const user = await User.findById("648f0efc497900d8f0a2fcec");
        expect(user.following.map((id) => id.toString())).toContain(id);
      });
    });

    describe("unfollow user", () => {
      it("should return a 200", async () => {
        await request(app)
          .patch(`/api/user/${id}/follow`)
          .set("Cookie", token)
          .expect(200);
      });

      it("should show the user as not followed", async () => {
        const user = await User.findById("648f0efc497900d8f0a2fcec");
        expect(user.following.map((id) => id.toString())).not.toContain(id);
      });
    });

    describe("user does not exist", () => {
      it("should return a 404", async () => {
        await request(app)
          .patch("/api/user/23/follow")
          .set("Cookie", token)
          .expect(404);
      });
    });

    describe("following same user", () => {
      it("should return a 400", async () => {
        await request(app)
          .patch(`/api/user/648f0efc497900d8f0a2fcec/follow`)
          .set("Cookie", token)
          .expect(400);
      });
    });
  });
});

afterAll(async () => {
  await User.deleteOne({ _id: id });
  await mongoose.connection.close();
});
