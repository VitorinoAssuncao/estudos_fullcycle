import { app, sequelize } from "../express";
import request from "supertest";

describe("Customer API", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a new customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "John Doe",
        address: {
          street: "Main Street",
          number: 123,
          city: "New York",
          zip: "12345",
        },
      });

    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined();
  });

  it("should return 500 when an error occurs", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "",
        address: {
          street: "Main Street",
          number: 123,
          city: "New York",
          zip: "12345",
        },
      });

    expect(response.status).toBe(500);
  });

  it("should list all customers", async () => {
    const creation = await request(app)
      .post("/customer")
      .send({
        name: "John Doe",
        address: {
          street: "Main Street",
          number: 123,
          city: "New York",
          zip: "12345",
        },
      });

    expect(creation.status).toBe(200);

    const creation2 = await request(app)
      .post("/customer")
      .send({
        name: "Janny",
        address: {
          street: "Main Street",
          number: 125,
          city: "New York",
          zip: "12346",
        },
      });

    expect(creation2.status).toBe(200);

    const response = await request(app).get("/customer").send();

    expect(response.status).toBe(200);
    expect(response.body.customers.length).toBe(2);
    expect(response.body.customers[0].id).toBeDefined();
    expect(response.body.customers[1].id).toBeDefined();

    const responseXML = await (await request(app).get("/customer").set("Accept","application/xml").send());

    expect(responseXML.status).toBe(200);
    expect(responseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`)
  });
});
