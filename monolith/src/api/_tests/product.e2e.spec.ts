import { app, sequelize } from "../express";
import request from "supertest";

describe("Product API", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
      });
    
      afterAll(async () => {
        await sequelize.close();
      });

      it("should create a product", async () => {
        const res = await request(app).post("/product").send({
          name: "Product 1",
          purchasePrice: 10.0,
          salesPrice: 15.0,
          description: "Product 1 description",
          stock: 10,
        });
    
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("id");
        expect(res.body.id).toBeDefined();
        expect(res.body.name).toEqual("Product 1");
        expect(res.body.purchasePrice).toEqual(10.0);
        expect(res.body.salesPrice).toEqual(15.0);
        expect(res.body.description).toEqual("Product 1 description");
        expect(res.body.stock).toEqual(10);
      });

      it("should get a created product", async () => {
        const created = await request(app).post("/product").send({
          name: "Product 1",
          purchasePrice: 10.0,
          salesPrice: 15.0,
          description: "Product 1 description",
          stock: 10,
        });
    
        const res = await request(app).get(`/product/${created.body.id}`);

        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("id");
        expect(res.body.id).toBeDefined();
        expect(res.body.name).toEqual("Product 1");
        expect(res.body.salesPrice).toEqual(15.0);
        expect(res.body.description).toEqual("Product 1 description");
      });

      it("should list all created products", async () => {
        await request(app).post("/product").send({
          name: "Product 1",
          purchasePrice: 10.0,
          salesPrice: 15.0,
          description: "Product 1 description",
          stock: 10,
        });
    

        await request(app).post("/product").send({
            name: "Product 2",
            purchasePrice: 10.0,
            salesPrice: 15.0,
            description: "Product 2 description",
            stock: 10,
          });
        const res = await request(app).get(`/product`);

        expect(res.status).toEqual(200);
        expect(res.body.products.length).toEqual(2);
        expect(res.body.products[0].name).toEqual("Product 1");
        expect(res.body.products[1].name).toEqual("Product 2");
      });
});