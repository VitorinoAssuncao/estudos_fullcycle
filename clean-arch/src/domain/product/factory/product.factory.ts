import Product from "../entity/product";
import ProductB from "../entity/product-b";
import ProductInterface from "../entity/product.interface";
import {v4 as uuid} from "uuid";

export default class ProductFactory{
    public static create(type:string, name:string, price:number):ProductInterface{
        let product
        switch(type){
            case "a":
                product = new Product(uuid(), name, price)
                break;
            case "b":
                product = new ProductB(uuid(), name, price)
                break; 
            default:
                throw new Error("Product Type not supported");
                
        }

        return product
    };
}