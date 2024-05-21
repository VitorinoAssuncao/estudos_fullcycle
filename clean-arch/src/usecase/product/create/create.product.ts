import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-interface";
import {CreateProductInput,  CreateProductOutput } from "./create.product.dto";

export default class CreateProductUseCase{
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface){
        this.productRepository = productRepository;
    }
    
    async execute(input: CreateProductInput): Promise<CreateProductOutput>{
        const product = ProductFactory.create(input.type, input.name, input.price);

        await this.productRepository.create(product);
        
        return { id: product.id };
    }
}