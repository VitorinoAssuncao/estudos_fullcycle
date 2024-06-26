import ID from "../../@shared/domain/vo/id.vo";
import Product from "../domain/product.entity";
import StoreCatalogGateway from "../gateway/store-catalog.gateway";
import { FindByIDDTO } from "../usecase/find-by-id/find-by-id.dto";
import ProductModel from "./product.model";

 export default class ProductRepository implements StoreCatalogGateway{
    async findAll():Promise<Product[]> {
        const products = await ProductModel.findAll();
        
        return products.map(product => new Product({
            id: new ID(product.id) ,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,
        }));
    }

    async findByID(input: FindByIDDTO): Promise<Product> {
        const product = await ProductModel.findByPk(input.id);
        if(!product){
            throw new Error("Product not found");
        }

        return new Product({
            id: new ID(product.id),
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,
        });
    }

}