import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-interface";
import { UpdateProductInput, UpdateProductOutput } from "./update.product.dto";

export default class UpdateProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface){
        this.productRepository = productRepository;
    }

    async execute(input: UpdateProductInput): Promise<UpdateProductOutput>{
        const product = await this.productRepository.find(input.id);

        product.changeName(input.name);
        product.changePrice(input.price);

        await this.productRepository.update(product);
        
        return {
            name: input.name,
            price: input.price
        };
    }
}