import { app, sequelize } from "../express";
import request from "supertest";

describe("Checkout API", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
      });
    
      afterAll(async () => {
        await sequelize.close();
      });

      it("should make a new checkout successfully", async () => {
        const clientCreated = await request(app).post("/client").send({
          "name": "Jhon",
            "document":"123456",
            "email":"email@gmail.com",
            "address":{
                "street":"any street",
                "number":"1",
                "complement":"",
                "city":"SaoPaolo",
                "state":"SP",
                "zipCode":"33333"
            }
        });
    
        const productCreated = await request(app).post("/product").send({
            name: "Product 1",
            purchasePrice: 10.0,
            salesPrice: 150.0,
            description: "Product 1 description",
            stock: 10,
          });

        const res = await request(app).post("/checkout").send({
            clientID: clientCreated.body.id,
            products: [
                {
                    productID: productCreated.body.id
                }
            ]
        });

        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("orderID");
        expect(res.body.orderID).toBeDefined();
        expect(res.body).toHaveProperty("invoiceID");
        expect(res.body.invoiceID).toBeDefined();
        expect(res.body).toHaveProperty("status");
        expect(res.body.status).toBe("approved");
        expect(res.body).toHaveProperty("total");
        expect(res.body.total).toBe(150.0);
        expect(res.body).toHaveProperty("products");
        expect(res.body.products).toHaveLength(1);
      });

      it("should create a new checkout and maintain pending when total less than 100", async () => {
        const clientCreated = await request(app).post("/client").send({
          "name": "Jhon",
            "document":"123456",
            "email":"email@gmail.com",
            "address":{
                "street":"any street",
                "number":"1",
                "complement":"",
                "city":"SaoPaolo",
                "state":"SP",
                "zipCode":"33333"
            }
        });
    
        const productCreated = await request(app).post("/product").send({
            name: "Product 1",
            purchasePrice: 10.0,
            salesPrice: 50.0,
            description: "Product 1 description",
            stock: 10,
          });

        const res = await request(app).post("/checkout").send({
            clientID: clientCreated.body.id,
            products: [
                {
                    productID: productCreated.body.id
                }
            ]
        });

        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("orderID");
        expect(res.body.orderID).toBeDefined();
        expect(res.body).toHaveProperty("invoiceID");
        expect(res.body.invoiceID).toBeNull();
        expect(res.body).toHaveProperty("status");
        expect(res.body.status).toBe("pending");
        expect(res.body).toHaveProperty("total");
        expect(res.body.total).toBe(50.0);
        expect(res.body).toHaveProperty("products");
        expect(res.body.products).toHaveLength(1);
      });
});