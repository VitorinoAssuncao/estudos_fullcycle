import Address from "../../../domain/customer/entity/address";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import ListCustomerUseCase from "./list.customer";

const customer1 = CustomerFactory.createWithAddress("João", new Address("Rua 1",1,"123456","São Paulo"));
const customer2 = CustomerFactory.createWithAddress("Naythalia", new Address("Rua 33",33,"123456","Belzonte"));

const mockCustomerRepository = {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn().mockResolvedValue([customer1,customer2])
};

describe('List Customer', () => {
    it('should list all customers', async () => {
        const usecase = new ListCustomerUseCase(mockCustomerRepository);

        const got = await usecase.execute({});

        expect(got.customers.length).toEqual(2);
        expect(got.customers[0].name).toEqual(customer1.name);
        expect(got.customers[0].address.city).toEqual(customer1.address.city);
        expect(got.customers[1].name).toEqual(customer2.name);
        expect(got.customers[1].address.city).toEqual(customer2.address.city);
    })
});