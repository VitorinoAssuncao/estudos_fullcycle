import { Sequelize } from "sequelize-typescript";
import Invoice, { InvoiceItem } from "../domain/invoice.entity";
import InvoiceModel from "./invoice.model";
import InvoiceItemModel from "./invoice-item.model";
import InvoiceRepository from "./invoice.repository";

describe('InvoiceRepository unit test', () => {
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

    it('should add an invoice', async () => {
        const invoice = new Invoice({
            name: 'Invoice 1',
            document: '123456789',
            address: {
                street: 'Street 1',
                number: '123',
                complement: 'Complement 1',
                city: 'City 1',
                state: 'State 1',
                zipCode: '12345678',
            },
            items: [
                {
                    name: 'Item 1',
                    price: 100,
                },
                {
                    name: 'Item 2',
                    price: 200,
                },
            ],
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        const invoiceRepository = new InvoiceRepository();

        await invoiceRepository.add(invoice);

        const result = await InvoiceModel.findByPk(invoice.id.value,{include: [InvoiceItemModel]});

        expect(result.id).toEqual(invoice.id.value);
        expect(result.name).toEqual(invoice.name);
        expect(result.document).toEqual(invoice.document);
        expect(result.street).toEqual(invoice.address.street);
        expect(result.number).toEqual(invoice.address.number);
        expect(result.complement).toEqual(invoice.address.complement);
        expect(result.city).toEqual(invoice.address.city);
        expect(result.state).toEqual(invoice.address.state);
        expect(result.zipCode).toEqual(invoice.address.zipCode);
        expect(result.items.length).toEqual(invoice.items.length);
        expect(result.items[0].name).toEqual(invoice.items[0].name);
        expect(result.items[0].price).toEqual(invoice.items[0].price);
        expect(result.items[1].name).toEqual(invoice.items[1].name);
        expect(result.items[1].price).toEqual(invoice.items[1].price);
        expect(result.createdAt).toEqual(invoice.createdAt);
        expect(result.updatedAt).toEqual(invoice.updatedAt);
    })

    it('should find an invoice', async () => {
            const invoice = new Invoice({
                name: 'Invoice 1',
                document: '123456789',
                address: {
                    street: 'Street 1',
                    number: '123',
                    complement: 'Complement 1',
                    city: 'City 1',
                    state: 'State 1',
                    zipCode: '12345678',
                },
                items: [
                    {
                        name: 'Item 1',
                        price: 100,
                    },
                    {
                        name: 'Item 2',
                        price: 200,
                    },
                ],
                createdAt: new Date(),
                updatedAt: new Date(),
            })
    
            const invoiceRepository = new InvoiceRepository();
    
            await InvoiceModel.create({
                id: invoice.id.value,
                name: invoice.name,
                document: invoice.document,
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipCode: invoice.address.zipCode,
                items: invoice.items.map(item => (
                    {
                    id: item.id.value,
                    invoice_id: invoice.id.value,
                    name: item.name,
                    price: item.price,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt 
                })),
                createdAt: invoice.createdAt,
                updatedAt: invoice.updatedAt
            },{
                include: [{model: InvoiceItemModel}]
            });
    
            const result = await invoiceRepository.findByID(invoice.id.value)
    
            expect(result.id.value).toEqual(invoice.id.value);
            expect(result.name).toEqual(invoice.name);
            expect(result.document).toEqual(invoice.document);
            expect(result.address.street).toEqual(invoice.address.street);
            expect(result.address.number).toEqual(invoice.address.number);
            expect(result.address.complement).toEqual(invoice.address.complement);
            expect(result.address.city).toEqual(invoice.address.city);
            expect(result.address.state).toEqual(invoice.address.state);
            expect(result.address.zipCode).toEqual(invoice.address.zipCode);
            expect(result.items.length).toEqual(invoice.items.length);
            expect(result.items[0].name).toEqual(invoice.items[0].name);
            expect(result.items[0].price).toEqual(invoice.items[0].price);
            expect(result.items[1].name).toEqual(invoice.items[1].name);
            expect(result.items[1].price).toEqual(invoice.items[1].price);
            expect(result.createdAt).toEqual(invoice.createdAt);
            expect(result.updatedAt).toEqual(invoice.updatedAt);
        })
});