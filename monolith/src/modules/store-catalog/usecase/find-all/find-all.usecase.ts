import StoreCatalogGateway from "../../gateway/store-catalog.gateway";

export default class FindAllUsecase{
    private _storeCatalogRepository: StoreCatalogGateway;

    constructor(repository: StoreCatalogGateway) {
        this._storeCatalogRepository = repository;
    }

    async execute():Promise<any> {
        const storeCatalogs = await this._storeCatalogRepository.findAll();
        return storeCatalogs.map(storeCatalog => ({
            id: storeCatalog.id.value,
            name: storeCatalog.name,
            description: storeCatalog.description,
            salesPrice: storeCatalog.salesPrice,
        }));
    }
}