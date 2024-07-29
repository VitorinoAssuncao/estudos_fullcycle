import { app, sequelize } from "../express";
import request from "supertest";

describe("Client API", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
      });
    
      afterAll(async () => {
        await sequelize.close();
      });

      it("should create a new client", async () => {
        const res = await request(app).post("/client").send({
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
    
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("id");
        expect(res.body.id).toBeDefined();
        expect(res.body.name).toEqual("Jhon");
        expect(res.body.document).toEqual("123456");
        expect(res.body.email).toEqual("email@gmail.com");
        expect(res.body.address.street).toEqual("any street");
        expect(res.body.address.number).toEqual("1");
        expect(res.body.address.complement).toEqual("");
        expect(res.body.address.city).toEqual("SaoPaolo");
        expect(res.body.address.state).toEqual("SP");
        expect(res.body.address.zipCode).toEqual("33333");
      });
});