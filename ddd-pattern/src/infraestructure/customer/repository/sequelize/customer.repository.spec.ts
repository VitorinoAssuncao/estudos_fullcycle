import { Sequelize } from "sequelize-typescript"
import Customer from "../../../../domain/customer/entity/customers"
import CustomerModel from "./customer.model";
import CustomerRepository from "./customer.repository";
import Address from "../../../../domain/customer/entity/address";

describe("Customer Repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
      sequelize.addModels([CustomerModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });

    it("should create a customer", async () => {
      const customerRepository = new CustomerRepository();
      const customer = new Customer("1","Joao");
      const address = new Address("Rua 1",1,"8900000","Sao Paulo")
  
      customer.Address = address

      await customerRepository.create(customer);
  
      const customerModel = await CustomerModel.findOne({ where: { id: "1" } });
  
      expect(customerModel.toJSON()).toStrictEqual({
        id: "1",
        name: "Joao",
        street:"Rua 1",
        number: 1,
        zipcode:"8900000",
        city:"Sao Paulo",
        active: false,
        rewardPoints: 0,
      });
    });

    it("should update a customer", async () => {
      const customerRepository = new CustomerRepository();
      const customer = new Customer("1", "Joao");
      customer.Address = new Address("Rua 1", 1, "1","Sao Paulo")
  
      await customerRepository.create(customer);
  
      customer.activate();
      customer.addRewardPoints(100);

      await customerRepository.update(customer);

      const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

      expect(customerModel.toJSON()).toStrictEqual({
        id: "1",
        name: "Joao",
        street:"Rua 1",
        number: 1,
        zipcode:"1",
        city:"Sao Paulo",
        active: true,
        rewardPoints: 100,
      });
    });

    it("should find a customer", async () => {
      const customerRepository = new CustomerRepository();
      const customer = new Customer("1", "Joao");
      customer.Address = new Address("Rua 1", 1, "1", "Sao Paulo")

  
      await customerRepository.create(customer);

      const found = await customerRepository.find("1");

      expect(found).toStrictEqual(customer);

    });

    it("should find all customers", async () => {
      const customerRepository = new CustomerRepository();
      
      const customer = new Customer("1", "Joao");
      const customer2 = new Customer("2", "Maria");

      const address = new Address("rua 1", 1, "1", "Sao Paulo")

      customer.Address = address
      customer2.Address = address

      await customerRepository.create(customer);
      await customerRepository.create(customer2);

      const found = await customerRepository.findAll();

      const customers = [customer, customer2]

      expect(customers).toStrictEqual(found);
    });
});