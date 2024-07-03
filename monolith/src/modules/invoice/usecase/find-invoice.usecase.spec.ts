import Invoice from "../domain/invoice.entity";
import FindInvoiceUsecase from "./find-invoice.usecase";

describe('FindInvoiceUsecase', () => {
    const invoice = new Invoice({
        id: '1',
        name: 'Customer 1',
        document: '123.456.789-00',
        address: {
            street: 'Street 1',
            number: '123',
            complement: 'Complement 1',
            city: 'City 1',
            state: 'State 1',
            zipCode: '12345-678',
        },
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
    });

    const MockRepository = () =>{
        return {
            add: jest.fn(),
            findByID: jest.fn().mockResolvedValue(invoice),
        }
    }

    it('should find an invoice', async () => {
        const repository = MockRepository();
        const findInvoice = new FindInvoiceUsecase(repository);

        const result = await findInvoice.execute({id: '1'});

        expect(repository.findByID).toHaveBeenCalled();
        expect(repository.findByID).toHaveBeenCalledTimes(1);

        expect(result.id).toEqual(invoice.id);
        expect(result.name).toEqual(invoice.name);
        expect(result.document).toEqual(invoice.document);
        expect(result.address).toEqual(invoice.address);
        expect(result.items).toEqual(invoice.items);
        expect(result.createdAt).toEqual(invoice.createdAt);
        expect(result.updatedAt).toEqual(invoice.updatedAt);
    });
});