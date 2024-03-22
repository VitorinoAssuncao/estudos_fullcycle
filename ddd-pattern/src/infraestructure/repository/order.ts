import OrderRepositoryInterface from "../../domain/repository/order-interface";
import Order from "../../domain/entity/order";
import OrderModel from "../db/sequelize/model/order";
import OrderItemModel from "../db/sequelize/model/order-item";

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
        throw new Error("not implemented");
    }

    async find(id: string): Promise<Order> {        
        throw new Error("not implemented");
    }

    async findAll(): Promise<Order[]> {        
        throw new Error("not implemented");
    }
}