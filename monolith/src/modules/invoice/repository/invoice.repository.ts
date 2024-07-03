import Invoice from "../domain/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceItemModel from "./invoice-item.model";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway{
    async add(invoice: Invoice): Promise<void> {
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
        
        return
    }

    async findByID(id: string): Promise<Invoice> {
        const invoice = await InvoiceModel.findByPk( id,{include: [InvoiceItemModel]});
        if(!invoice){
            throw new Error('Invoice not found');
        }

        return new Invoice({
            id: invoice.id,
            name: invoice.name,
            document: invoice.document,
            address: {
                street: invoice.street,
                number: invoice.number,
                complement: invoice.complement,
                city: invoice.city,
                state: invoice.state,
                zipCode: invoice.zipCode
            },
            items: invoice.items.map(item => (
                {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt
                }
            )),
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
        });
    }
}