import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../../../infraestructure/customer/repository/sequelize/customer.model"
import Customer from "../../../domain/customer/entity/customers";
import Address from "../../../domain/customer/entity/address";
import FindCustomerUsecase from "./find.customer";

const customer = new Customer("1","Joao");
const address = new Address("Rua 1",1,"8900000","Sao Paulo")
customer.changeAddress(address);

const MockRepository =  () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn()
  }
}

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
      const customerRepository = MockRepository();

      const usecase = new FindCustomerUsecase(customerRepository);
       
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

    it('should not found a customer', async () => {
      const customerRepository = MockRepository();

      customerRepository.find.mockImplementation(() => {
        throw new Error("Customer not found");
      })

      const usecase = new FindCustomerUsecase(customerRepository);
       
      const input = {id: "1"};


      expect( () => {
        return  usecase.execute(input)
      }).rejects.toThrow("Customer not found");
    }) 

});
