import Product from "../domain/product.entity";
import { FindByIDDTO } from "../usecase/find-by-id/find-by-id.dto";

export default interface StoreCatalogGateway{
    findAll(): Promise<Product[]>;
    findByID(input:FindByIDDTO): Promise<Product>;
}