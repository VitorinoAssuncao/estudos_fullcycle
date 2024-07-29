import ID from "../../@shared/domain/vo/id.vo";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductGateway{
    async add(product: Product): Promise<void> {
        await ProductModel.create({
            id: product.id.value,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            salesPrice: product.salesPrice,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        });
    }

    async findByID(id: string): Promise<Product> {
        const product = await ProductModel.findByPk(id);
        if(!product){
            throw new Error("Product not found");
        }

        return new Product({
            id: new ID(product.id),
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            salesPrice: product.salesPrice,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
    });
    }
}