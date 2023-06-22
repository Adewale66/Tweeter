import mongoose from "mongoose";
import request from "supertest";
import app from "../../app";
import { deleteUserHelper } from "../../helpers/userHelper";
import { MONGODB_URI } from "../../utils/config";

beforeAll(async () => {
  await mongoose.connect(MONGODB_URI);
  await deleteUserHelper();
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
    await request(app)
      .post("/api/user")
      .send({
        name: "wale",
        username: "wale",
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
    const res = await request(app).get("/api/user/648ccab2d7bbbda865d1b107");
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("wale");
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
  await mongoose.connection.close();
});
