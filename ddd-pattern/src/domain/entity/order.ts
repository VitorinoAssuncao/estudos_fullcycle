import { error } from "console";
import OrderItem from "./order_item";

export default class Order{
    private _id:string;
    private _customerID:string;
    private _items: OrderItem[];

    constructor(id:string, customerID:string, items:OrderItem[]){
        this._id = id;
        this._customerID = customerID;
        this._items = items;

        this.validate()
    }

    get id(): string {
        return this._id;
      }

      get customerID(): string {
        return this._customerID;
      }

      get items(): OrderItem[] {
        return this._items;
      }

      validate() {
        if (this._id.length === 0) {
          throw new Error("Id is required");
        }
        if (this._customerID.length === 0) {
          throw new Error("CustomerID is required");
        }
        if (this._items.length === 0){
            throw new Error("Need at least one item per order")
        } 
      }

    total(): number{
        return this._items.reduce((acc, item) => acc + (item.price*item.quantity), 0)
    }

    updateOrderItems(items:OrderItem[]){
      this._items = items
    }

}