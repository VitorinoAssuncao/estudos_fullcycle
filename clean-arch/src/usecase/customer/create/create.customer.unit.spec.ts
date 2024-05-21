import CreateCustomerUsecase from "./create.customer"

const input = {
    name: "Joao",
    address: {
        street: "Rua 1",
        number: 1,
        zipCode: "8900000",
        city: "Sao Paulo"
    }
}

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn()
    }
}

describe('Create Customer', () => {
    it('should create a customer', async () => {
        const customerRepository = MockRepository();

        const usecase = new CreateCustomerUsecase(customerRepository);

        const got = await usecase.execute(input);

        expect(got.id).toBeDefined();
    })

    it('should throw and error when name is invalid', async () => {
        const customerRepository = MockRepository();

        const usecase = new CreateCustomerUsecase(customerRepository);

        input.name = "";

        await expect(usecase.execute(input)).rejects.toThrow("Name is required");
    })

})