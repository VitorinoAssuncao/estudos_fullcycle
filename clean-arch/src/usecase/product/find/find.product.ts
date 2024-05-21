import ProductRepositoryInterface from "../../../domain/product/repository/product-interface";
import { FindProductInput, FindProductOutput } from "./find.product.dto";

export default class FindProductUseCase{
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface){
        this.productRepository = productRepository;
    }
    
    async execute(input: FindProductInput): Promise<FindProductOutput>{
        const product = await this.productRepository.find(input.id);
        
        return { 
            id: product.id,
            name: product.name,
            price: product.price
        };
    }
}