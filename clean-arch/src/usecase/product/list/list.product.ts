import ProductRepositoryInterface from "../../../domain/product/repository/product-interface";
import { ListProductInput,ListProductOutput } from "./list.product.dto";

export default class ListProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface){
        this.productRepository = productRepository;
    }

    async execute(input: ListProductInput): Promise<ListProductOutput>{
        const products = await this.productRepository.findAll();

        return {
            products: products.map(product => {
                return {
                    id: product.id,
                    name: product.name,
                    price: product.price
                }
            })
        }

    }
}