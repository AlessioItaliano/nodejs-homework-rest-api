require("dotenv").config();
const mongoose = require("mongoose");

const request = require("supertest");
const app = require("../../app");

const { TEST_EMAIL, TEST_PASSWORD, DB_URI, PORT } = process.env;

describe("Test logIn user controllers", () => {
  beforeAll(() => {
    mongoose.connect(DB_URI);
    app.listen(PORT);
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test('"відповідь повинна мати статус-код 200"', async () => {
    const result = await request(app)
      .post("/users/login")
      .send({ email: TEST_EMAIL, password: TEST_PASSWORD });

    expect(result.status).toBe(200);
  });

  test('"у відповіді повинен повертатися токен"', async () => {
    const result = await request(app)
      .post("/users/login")
      .send({ email: TEST_EMAIL, password: TEST_PASSWORD });

    expect(result.body.token).toBeDefined();
  });

  test('"у відповіді повинен повертатися user з 2 полями email и subscription з типом даних String"', async () => {
    const result = await request(app)
      .post("/users/login")
      .send({ email: TEST_EMAIL, password: TEST_PASSWORD });

    expect(result.body.user).toBeDefined();
    expect(typeof result.body.user.email).toBe("string");
    expect(typeof result.body.user.subscription).toBe("string");
  });
});
