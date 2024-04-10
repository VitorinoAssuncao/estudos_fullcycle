import Customer from "../../customer/entity/customers";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order Service unit tests",() =>{
    it("should sum total of all orders",() =>{

        const orderItem = new OrderItem("oi1",100,"P1","Product 1",1)
        const orderItem2 = new OrderItem("oi2",100,"P2","Product 2",2)

        const order1 = new Order("o1","customerID1",[orderItem])
        const order2 = new Order("o2","customerID1",[orderItem,orderItem2])

        expect(OrderService.calculateOrdersTotal([order1, order2])).toBe(400);
    })

    it("should throw error when placing order with empty item list",() => {
        const customer = new Customer("customerID1","Jhon Doe");

        expect(() =>{
            let order = OrderService.placeOrder(customer, [])
          }).toThrow("Order must have at least one item");
    })

    it("should place an order and update reward points from customer",() => {
        const customer = new Customer("customerID1","Jhon Doe");
        const item = new OrderItem("item1",100,"product-id-1","Product 1", 1);

        const order = OrderService.placeOrder(customer, [item]);

        expect(order.total()).toBe(100);
        expect(customer.rewardPoints).toBe(50);
    })
})