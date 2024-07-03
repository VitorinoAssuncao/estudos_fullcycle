import StoreCatalogFacade from "../facade/store-catalog.facade";
import ProductRepository from "../repository/product.repository";
import FindAllUsecase from "../usecase/find-all/find-all.usecase";
import FindByIDUsecase from "../usecase/find-by-id/find-by-id.usecase";

export default class StoreCatalogFacadeFactory {
    static create() {
        const productRepository = new ProductRepository();

        return new StoreCatalogFacade({
            findAllUseCase: new FindAllUsecase(productRepository),
            findByIDUseCase: new FindByIDUsecase(productRepository)
        })
    }
}