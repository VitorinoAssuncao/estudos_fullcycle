import OrderRepositoryInterface from "../../domain/repository/order-interface";
import Order from "../../domain/entity/order";

export default class OrderRepository implements OrderRepositoryInterface{
    async create(entity: Order): Promise<void> {
        throw new Error("not implemented");
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