import { Sequelize } from "sequelize-typescript";
import InvoiceItemModel from "../repository/invoice-item.model";
import InvoiceModel from "../repository/invoice.model";
import InvoiceFacadeFactory from "../factory/facade.factory";

describe('InvoiceFacade', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([InvoiceItemModel, InvoiceModel]);

        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it('should create a new invoice', async () => {
        // Arrange
        const invoiceFacade = InvoiceFacadeFactory.create();
        const input = {
            name: 'John Doe',
            document: '12345678901',
            street: 'Main Street',
            number: '123',
            complement: 'Near the park',
            city: 'Springfield',
            state: 'SP',
            zipCode: '12345-678',
            items: [
                {
                    id: '1',
                    name: 'Item 1',
                    price: 10,
                },
                {
                    id: '2',
                    name: 'Item 2',
                    price: 20,
                },
            ],
        }

        // Act
        const result = await invoiceFacade.generateInvoice(input);

        // Assert
        expect(result.id).toBeDefined();
        expect(result.name).toEqual(input.name);
        expect(result.document).toEqual(input.document);
        expect(result.street).toEqual(input.street);
        expect(result.number).toEqual(input.number);
        expect(result.complement).toEqual(input.complement);
        expect(result.city).toEqual(input.city);
        expect(result.state).toEqual(input.state);
        expect(result.zipCode).toEqual(input.zipCode);
        expect(result.items).toHaveLength(2);
        expect(result.items[0].name).toEqual(input.items[0].name);
        expect(result.items[0].price).toEqual(input.items[0].price);
        expect(result.items[1].name).toEqual(input.items[1].name);
        expect(result.items[1].price).toEqual(input.items[1].price);
    });

});