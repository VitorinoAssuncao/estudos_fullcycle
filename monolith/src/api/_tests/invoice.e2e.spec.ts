import { app, sequelize } from "../express";
import request from "supertest";

describe("Invoice API", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
      });
    
      afterAll(async () => {
        await sequelize.close();
      });

      it("should get an invoice after checkout is successfully created", async () => {
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

        const orderCreated = await request(app).post("/checkout").send({
            clientID: clientCreated.body.id,
            products: [
                {
                    productID: productCreated.body.id
                }
            ]
        });

        const res = await request(app).get(`/invoice/${orderCreated.body.invoiceID}`);

        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("id");
        expect(res.body.id).toBeDefined();
        expect(res.body).toHaveProperty("name");
        expect(res.body.name).toEqual("Jhon");
        expect(res.body).toHaveProperty("document");
        expect(res.body.document).toEqual("123456");
        expect(res.body).toHaveProperty("address");
        expect(res.body.address).toHaveProperty("street");
        expect(res.body.address.street).toEqual("any street");
        expect(res.body.address).toHaveProperty("number");
        expect(res.body.address.number).toEqual("1");
        expect(res.body.address).toHaveProperty("complement");
        expect(res.body.address.complement).toEqual("");
        expect(res.body.address).toHaveProperty("city");
        expect(res.body.address.city).toEqual("SaoPaolo");
        expect(res.body.address).toHaveProperty("state");
        expect(res.body.address.state).toEqual("SP");
        expect(res.body.address).toHaveProperty("zipCode");
        expect(res.body.address.zipCode).toEqual("33333");
        expect(res.body).toHaveProperty("items");
        expect(res.body.items).toHaveLength(1);
        expect(res.body.items[0]).toHaveProperty("id");
        expect(res.body.items[0].id).toBeDefined();
        expect(res.body.items[0]).toHaveProperty("name");
        expect(res.body.items[0].name).toEqual("Product 1");
        expect(res.body.items[0]).toHaveProperty("price");
        expect(res.body.items[0].price).toEqual(150.0);
        expect(res.body).toHaveProperty("total");
        expect(res.body.total).toEqual(150.0);
        expect(res.body).toHaveProperty("createdAt");
        expect(res.body.createdAt).toBeDefined();
      });

});