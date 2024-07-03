import GenerateInvoiceUseCase from "./generate-invoice.usecase";

describe('GenerateInvoiceUsecase', () => {
    const MockRepository = () =>{
        return {
            add: jest.fn(),
            findByID: jest.fn(),
        }
    }

    it('should generate an invoice', async () => {
        const repository = MockRepository();
        const useCase = new GenerateInvoiceUseCase(repository);

        const input = {
            name: 'Customer 1',
            document: '123.456.789-00',
            street: 'Street 1',
            number: '123',
            complement: 'Complement 1',
            city: 'City 1',
            state: 'State 1',
            zipCode: '12345-678',
            items: [
                {
                    id: '1',
                    name: 'Product 1',
                    price: 100,
                },
                {
                    id: '2',
                    name: 'Product 2',
                    price: 200,
                }
            ]
        }
        
        const result = await useCase.execute(input);

        expect(repository.add).toHaveBeenCalled();
        expect(result.name).toEqual(input.name);
        expect(result.document).toEqual(input.document);
        expect(result.address.street).toEqual(input.street);
        expect(result.address.number).toEqual(input.number);
        expect(result.address.complement).toEqual(input.complement);
        expect(result.address.city).toEqual(input.city);
        expect(result.address.state).toEqual(input.state);
        expect(result.address.zipCode).toEqual(input.zipCode);
        expect(result.items.length).toEqual(input.items.length);
        expect(result.items[0].id).toEqual(input.items[0].id);
        expect(result.items[0].name).toEqual(input.items[0].name);
        expect(result.items[0].price).toEqual(input.items[0].price);
        expect(result.items[1].id).toEqual(input.items[1].id);
        expect(result.items[1].name).toEqual(input.items[1].name);
        expect(result.items[1].price).toEqual(input.items[1].price);
        expect(result.total).toEqual(300);
    });
});


