import mongoose from "mongoose";
import request from "supertest";
import app from "../../app";
import { createUserHelper } from "../../helpers/userHelper";
import { MONGODB_URI } from "../../utils/config";
import User from "../../models/users";

beforeAll(async () => {
  await mongoose.connect(MONGODB_URI);
});

describe("register api", () => {
  test("should return a 201 on successful signup", async () => {
    await request(app)
      .post("/api/user")
      .send({
        name: "newuser",
        username: "newuser",
        password: "XXXXXXXX",
      })
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });

  test("should return 400 with empty fields", async () => {
    await request(app).post("/api/user").send({}).expect(400);
  });

  test("should return a 400 with a username that already exists", async () => {
    const user = await createUserHelper("tester", "tester");
    await request(app)
      .post("/api/user")
      .send({
        name: "wale",
        username: user.username,
        password: "wale",
      })
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
});

describe("getting users", () => {
  test("should return a 200 with a list of users", async () => {
    const res = await request(app).get("/api/user");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeDefined();
  });

  test("get a particular user", async () => {
    const user = await createUserHelper("tester2", "tester2");
    const res = await request(app).get(`/api/user/${user._id}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("testing");
  });

  test("user does not exist", async () => {
    await request(app).get("/api/user/doesnotexsit").expect(404);
  });
});

describe("delete user", () => {
  test("should return a 401", async () => {
    await request(app).delete("/api/user").expect(401);
  });

  test("should delete user", async () => {
    await request(app).post("/api/user").send({
      name: "XXX",
      username: "XXXX",
      password: "XXXXXX",
    });
    const user = await request(app).post("/api/login").send({
      username: "XXXX",
      password: "XXXXXX",
    });

    await request(app)
      .delete("/api/user")
      .set("Cookie", user.headers["set-cookie"])
      .expect(200);
  });
});

afterAll(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});
