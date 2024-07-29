import ID from "../../@shared/domain/vo/id.vo";
import Client from "../domain/client.entity"
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import OrderModel from "./order.model";


export default class OrderRepository  implements CheckoutGateway{
    async addOrder(order: Order): Promise<void> {
        await OrderModel.create({
            id: order.id.value,
            client_id: order.client.id.value,
            products: order.products.map(product => product.id.value),
            status: order.status,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        });
    }

    async findOrder(id: string): Promise<Order> {
        const order = await OrderModel.findByPk(id);
        if(!order){
            throw new Error("Order not found");
        }

        return new Order({
            id: new ID(order.id),
            client: new Client({
                id: new ID(order.client.id),
                name: order.client.name,
                document: order.client.document,
                email: order.client.email,
                address: {
                    street: order.client.street,
                    number: order.client.number,
                    complement:order.client.complement,
                    city: order.client.city,
                    state: order.client.state,
                    zipCode: order.client.zipCode,
                },
            }),
            products: order.products.map(product => new Product({
                id: new ID(product.id),
                name: product.product.name,
                description: product.product.description,
                salesPrice: product.product.salesPrice,
            })),
            status: order.status
        });
    }
}
    