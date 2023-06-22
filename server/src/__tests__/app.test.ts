import app from "../app";
import request from "supertest";

describe("Errors", () => {
  test("Unknown route", async () => {
    await request(app).get("/unknown").expect(404);
  });
});
