import {v4 as uuid} from "uuid";
import OrderFactory from "./order.factory";

describe("Order Factory unit tests", () => {
    it("should create a new order successfully", () => {
        const OrderProps = {
            id: uuid(),
            customerID: uuid(),
            items: [
                {
                    id: uuid(),
                    name: "Product 1",
                    productID: uuid(),
                    quantity: 2,
                    price: 10,
                },
                {
                    id: uuid(),
                    name: "Product 2",
                    productID: uuid(),
                    quantity: 1,
                    price: 20,
                }
            ],
        };

        const order = OrderFactory.create(OrderProps)

        expect(order.id).toBeDefined();
        expect(order.customerID).toBeDefined();
        expect(order.items.length).toBe(2);
        expect(order.total()).toBe(40);
    })
})