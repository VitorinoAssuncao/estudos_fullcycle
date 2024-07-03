import { Sequelize } from "sequelize-typescript";
import InvoiceItemModel from "../repository/invoice-item.model";
import InvoiceModel from "../repository/invoice.model";
import InvoiceFacadeFactory from "../factory/facade.factory";
import ProductModel from "../../product-adm/repository/product.model";

describe('InvoiceFacade', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([InvoiceModel, InvoiceItemModel]);

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

    it('should find an invoice by id', async () => {
        // Arrange
        const invoiceFacade = InvoiceFacadeFactory.create();
        const input = {
            id: '1',
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
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: '2',
                    name: 'Item 2',
                    price: 20,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
        }

        const invoice = await InvoiceModel.create({
            id: input.id,
            name: input.name,
            document: input.document,
            street: input.street,
            number: input.number,
            complement: input.complement,
            city: input.city,
            state: input.state,
            zipCode: input.zipCode,
            items: input.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
            })),
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            include: [InvoiceItemModel]
        
        });

        // Act
        const result = await invoiceFacade.findInvoice({ id: invoice.id });

        // Assert
        expect(result.id).toEqual(invoice.id);
        expect(result.name).toEqual(input.name);
        expect(result.document).toEqual(input.document);
        expect(result.address.street).toEqual(input.street);
        expect(result.address.number).toEqual(input.number);
        expect(result.address.complement).toEqual(input.complement);
        expect(result.address.city).toEqual(input.city);
        expect(result.address.state).toEqual(input.state);
        expect(result.address.zipCode).toEqual(input.zipCode);
        expect(result.items).toHaveLength(2);
        expect(result.items[0].name).toEqual(input.items[0].name);
        expect(result.items[0].price).toEqual(input.items[0].price);
        expect(result.items[1].name).toEqual(input.items[1].name);
        expect(result.items[1].price).toEqual(input.items[1].price);
    })

});