import { app, sequelize } from "../express";
import request from "supertest";

describe("Customer API", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a new product", async () => {
    const response = await request(app)
      .post("/products")
      .send({
        type: "a",
        name: "product 1",
        price: 10
      });

    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined();
  });

  it("should return 500 in case of error", async () => {
    const response = await request(app)
      .post("/products")
      .send({
        type: "a",
        name: "",
        price: 10
      });

    expect(response.status).toBe(500);
    expect(response.body.id).toBeUndefined();
  });

  it("should list all products", async () => {
    const created = await request(app)
      .post("/products")
      .send({
        type: "a",
        name: "product 1",
        price: 10
      });

    expect(created.status).toBe(200);

    const created2 = await request(app)
      .post("/products")
      .send({
        type: "a",
        name: "product 2",
        price: 50
      });

      expect(created2.status).toBe(200);

    const response = await request(app)
        .get("/products")
        .send();

    expect(response.status).toBe(200);
    expect(response.body.products.length).toBe(2);
    expect(response.body.products[0].id).toBeDefined();
    expect(response.body.products[1].id).toBeDefined();
  });
})