import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-interface";
import Order from "../../../../domain/checkout/entity/order";
import OrderModel from "./order.model";
import OrderItemModel from "./order-item.model";
import OrderItem from "../../../../domain/checkout/entity/order_item";

export default class OrderRepository implements OrderRepositoryInterface{
    async create(entity: Order): Promise<void> {
        await OrderModel.create(
            {
              id: entity.id,
              customer_id: entity.customerID,
              total: entity.total(),
              items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productID,
                quantity: item.quantity,
              })),
            },
            {
              include: [{ model: OrderItemModel }],
            }
          );
    }

    async update(entity: Order): Promise<void> {
        const orderModel = await OrderModel.findByPk(entity.id, {include:OrderItemModel})

        await Promise.all(entity.items.map(async item => {
            const existingOrderItem = orderModel.items.find(orderItem => orderItem.id === item.id);

            if (existingOrderItem) {
                await OrderItemModel.update(
                    {
                        name: item.name,
                        price: item.price,
                        product_id: item.productID,
                        quantity: item.quantity,
                    },
                    { where: { id: item.id } }
                );
            } else {
                await OrderItemModel.create({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productID,
                    quantity: item.quantity,
                    order_id: orderModel.id, 
                });
            }
        }));

        orderModel.customer_id = entity.customerID;
        orderModel.total = entity.total();

        await orderModel.save()
    }

    async find(id: string): Promise<Order> {       
        const orderModel = await OrderModel.findOne(
            { 
                where: { id: id },
                include: ["items"] 
            }
        );

        const orderItems = orderModel.items.map((item) =>{
            let orderItem = new OrderItem(item.id, item.price, item.product_id, item.name, item.quantity)

            return orderItem
        })

        const order = new Order(orderModel.id, orderModel.customer_id, orderItems)

        return order
    }

    async findAll(): Promise<Order[]> {        
        const orderModels = await OrderModel.findAll({ include: OrderItemModel })

        const orders = orderModels.map((order) =>{
            const orderItems = order.items.map((item) =>{
                return new OrderItem(item.id, item.price, item.product_id, item.name, item.quantity)
            })

            return new Order(order.id, order.customer_id, orderItems)
        })

        return orders
    }
}