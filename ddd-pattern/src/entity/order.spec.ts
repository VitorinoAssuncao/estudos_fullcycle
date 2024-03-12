import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () =>{
    it("should throw error when id is empty",() =>{
        expect(() =>{
          let order = new Order("","customerID",[])
        }).toThrow("Id is required")
      });

      it("should throw error when customerID is empty",() =>{
        expect(() =>{
          let order = new Order("abc","",[])
        }).toThrow("CustomerID is required")
      });

      it("should throw error when no item is added",() =>{
        expect(() =>{
          let order = new Order("abc","customerID",[])
        }).toThrow("Need at least one item per order")
      });

      it("should calculate total",() =>{
        const item = new OrderItem("1","item1",1)

        const order = new Order("abc","customerID",[item, item])
        expect(order.total()).toBe(2)
      });

})