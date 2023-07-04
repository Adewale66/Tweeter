import mongoose from "mongoose";
import request from "supertest";
import app from "../../app";
import { MONGODB_URI } from "../../utils/config";
import { createUserHelper, deleteUserHelper } from "../../helpers/userHelper";

beforeAll(async () => {
  await mongoose.connect(MONGODB_URI);
});

describe("login api", () => {
  test("login failed", async () => {
    await request(app)
      .post("/api/login")
      .send({
        username: "test",
        password: "test",
      })
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
  test("login success", async () => {
    const user = await createUserHelper("tester", "tester");
    console.log(user);

    await request(app)
      .post("/api/login")
      .send({
        username: "tester",
        password: "tester",
      })
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

afterAll(async () => {
  await deleteUserHelper("tester");
  await mongoose.connection.close();
});
