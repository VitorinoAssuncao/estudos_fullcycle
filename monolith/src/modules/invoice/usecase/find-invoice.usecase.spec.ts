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

        expect(result.id).toEqual(invoice.id.value);
        expect(result.name).toEqual(invoice.name);
        expect(result.document).toEqual(invoice.document);
        expect(result.address.street).toEqual(invoice.address.street);
        expect(result.address.number).toEqual(invoice.address.number);
        expect(result.address.complement).toEqual(invoice.address.complement);
        expect(result.address.city).toEqual(invoice.address.city);
        expect(result.address.state).toEqual(invoice.address.state);
        expect(result.address.zipCode).toEqual(invoice.address.zipCode);
        expect(result.items.length).toEqual(invoice.items.length);
        expect(result.items[0].id).toEqual(invoice.items[0].id.value);
        expect(result.items[0].name).toEqual(invoice.items[0].name);
        expect(result.items[0].price).toEqual(invoice.items[0].price);
        expect(result.items[1].id).toEqual(invoice.items[1].id.value);
        expect(result.items[1].name).toEqual(invoice.items[1].name);
        expect(result.items[1].price).toEqual(invoice.items[1].price);
        expect(result.total).toEqual(invoice.calculateTotal());
        expect(result.createdAt).toEqual(invoice.createdAt);
    });
});