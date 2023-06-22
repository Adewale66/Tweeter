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

describe("making Tweets", () => {
  test("can not make tweet unless logged in", async () => {
    await request(app).post(`${url}`).send({}).expect(401);
  });

  test("can make tweet when logged in", async () => {
    await request(app)
      .post(`${url}`)
      .set("Cookie", token)
      .send({
        tweet: "this is a test",
      })
      .expect(201);
  });
});

describe("getting tweets", () => {
  test("returns all tweets", async () => {
    await request(app).get(`${url}`).expect(200);
  });

  test("returns tweet by id", async () => {
    await request(app).get(`${url}/${id}`).expect(200);
  });

  test("returns 404 if tweet does not exist", async () => {
    await request(app).get(`${url}/doesnotexist`).expect(404);
  });
});

describe("altering tweets", () => {
  test("can not alter tweet unless logged in", async () => {
    await request(app).patch(`/api/tweet/${id}/like`).expect(401);
  });

  test("can not alter tweet if tweet does not exist", async () => {
    await request(app)
      .patch(`${url}/doesnotexist/like`)
      .set("Cookie", token)
      .expect(404);
  });

  describe("liking tweets", () => {
    describe("tweet liked", () => {
      test("returns 200", async () => {
        await request(app)
          .patch(`${url}/${id}/like`)
          .set("Cookie", token)
          .expect(200);
      });

      it("User should have stored tweet id", async () => {
        const user = await User.findOne({ username: "XXXXX" });
        expect(user.likes.map((x) => x.toString())).toContain(id);
      });
    });
    describe("remove like", () => {
      test("returns 200", async () => {
        await request(app)
          .patch(`${url}/${id}/like`)
          .set("Cookie", token)
          .expect(200);
      });

      test("User should not have  tweet id stored", async () => {
        const user = await User.findOne({ username: "XXXXX" });
        expect(user.likes.map((x) => x.toString())).not.toContain(id);
      });
    });
  });

  describe("retweets", () => {
    describe("retweeted", () => {
      it("should return 200", async () => {
        await request(app)
          .patch(`${url}/${id}/retweet`)
          .set("Cookie", token)
          .expect(200);
      });

      it("User should have stored tweet id", async () => {
        const user = await User.findOne({ username: "XXXXX" });
        expect(user.retweets.map((x) => x.toString())).toContain(id);
      });
    });

    describe("removing retweet", () => {
      it("should return 200", async () => {
        await request(app)
          .patch(`${url}/${id}/retweet`)
          .set("Cookie", token)
          .expect(200);
      });

      it("User should not tweet id stored", async () => {
        const user = await User.findOne({ username: "XXXXX" });
        expect(user.retweets.map((x) => x.toString())).not.toContain(id);
      });
    });
  });
  describe("saving tweets", () => {
    describe("saving tweet", () => {
      it("should return 200", async () => {
        await request(app)
          .patch(`${url}/${id}/save`)
          .set("Cookie", token)
          .expect(200);
      });

      it("User should have stored tweet id", async () => {
        const user = await User.findOne({ username: "XXXXX" });
        expect(user.saved.map((x) => x.toString())).toContain(id);
      });
    });

    describe("removing saved", () => {
      it("should return 200 for removing a retweet from a tweet", async () => {
        await request(app)
          .patch(`${url}/${id}/save`)
          .set("Cookie", token)
          .expect(200);
      });

      it("User should not have tweet id stored", async () => {
        const user = await User.findOne({ username: "XXXXX" });
        expect(user.saved.map((x) => x.toString())).not.toContain(id);
      });
    });
  });
});

describe("comments", () => {
  test("can not comment unless logged in", async () => {
    await request(app).post(`${url}/${id}/comment`).send({}).expect(401);
  });

  describe("making comments", () => {
    it("should return 200", async () => {
      const first = await User.findOne({ username: "XXXXX" });
      const len = first.comments.length;

      await request(app)
        .post(`${url}/${id}/comment`)
        .set("Cookie", token)
        .send({
          comment: "hello there",
        })
        .expect(200);
      const second = await User.findOne({ username: "XXXXX" });
      const secondLen = second.comments.length;

      expect(secondLen).toBe(len + 1);
    });
  });
});

afterAll(async () => {
  await Tweet.deleteMany({});
  await Comment.deleteMany({});
  const user = await User.findOne({ username: "XXXXX" });
  user.comments = [];
  await user.save();
  await mongoose.connection.close();
});
