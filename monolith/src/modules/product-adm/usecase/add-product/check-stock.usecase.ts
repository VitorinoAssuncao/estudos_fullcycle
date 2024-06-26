import ProductGateway from "../../gateway/product.gateway";
import { CheckStockInputDTO } from "./check-stock.dto";

export default class CheckStock {
    private _productRepository: ProductGateway;


    constructor(repository: ProductGateway) {
        this._productRepository = repository;
    }

    async execute(input:CheckStockInputDTO) {
        const product = await this._productRepository.findByID(input.id);
        return {
            id: product.id.value,
            stock: product.stock
        };
    }
}