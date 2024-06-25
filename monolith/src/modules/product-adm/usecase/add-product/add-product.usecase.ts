import ID from "../../../@shared/domain/vo/id.vo";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import { AddProductInputDTO, AddProductOutputDTO } from "./add-product.dto";

export default class AddProductUsecase{
    private _repository : ProductGateway;

    constructor(repository: ProductGateway){
        this._repository = repository;
    }

    async execute(input: AddProductInputDTO): Promise<AddProductOutputDTO>{
        const product = new Product({
            id: new ID(input.id),
            name: input.name,
            description: input.description,
            purchasePrice: input.purchasePrice,
            stock: input.stock
        });
        
        await this._repository.addProduct(product);

        return {
            id: product.id.value,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock
        }
    }
}