import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../../../infraestructure/customer/repository/sequelize/customer.model"
import CustomerRepository from "../../../infraestructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customers";
import Address from "../../../domain/customer/entity/address";
import FindCustomerUsecase from "./find.customer";

describe('Find Customer', () => {
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
  
   
    it('should find a customer', async () => {
      const customerRepository = new CustomerRepository();

      const usecase = new FindCustomerUsecase(customerRepository);

      const customer = new Customer("1","Joao");
      const address = new Address("Rua 1",1,"8900000","Sao Paulo")

      customer.changeAddress(address);


      await customerRepository.create(customer);
       
      const input = {id: "1"};

      const want = {
        id: "1",
        name: "Joao",
        address: {
          street: "Rua 1",
          number: 1,
          zipCode: "8900000",
          city: "Sao Paulo"
        }
      }

      const got = await usecase.execute(input);

      expect(want).toEqual(got);
    })

});
