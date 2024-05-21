import Address from "../../../domain/customer/entity/address"
import CustomerFactory from "../../../domain/customer/factory/customer.factory"
import UpdateCostumerUseCase from "./update.costumer"

describe('Update Customer', () => {
    const customer = CustomerFactory.createWithAddress("Joao", new Address("Rua 1", 1, "8900000", "Sao Paulo"))

    const input = {
        id: customer.id,
        name: "Maria",
        address: {
            street: "Rua 2",
            number: 2,
            zipCode: "8900111",
            city: "Belo Horizonte"
        }
    }

    const MockRepository = () => {
        return {
            create: jest.fn(),
            update: jest.fn(),
            find: jest.fn().mockReturnValue(Promise.resolve(customer)),
            findAll: jest.fn(),
        }
    }

    it('should update a customer', async () => {
        const repository = MockRepository()
        const usecase = new UpdateCostumerUseCase(repository)

        const result = await usecase.execute(input)

        expect(result).toEqual({
            id: input.id,
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zipCode: input.address.zipCode,
                city: input.address.city
            }
        })
    })

})