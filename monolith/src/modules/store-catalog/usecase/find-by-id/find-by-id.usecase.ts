export default class FindByIDUsecase{
    private _storeCatalogRepository: any;

    constructor(repository: any) {
        this._storeCatalogRepository = repository;
    }

    async execute(id: string) {
        const storeCatalog = await this._storeCatalogRepository.findByID(id);
        return {
            id: storeCatalog.id.value,
            name: storeCatalog.name,
            description: storeCatalog.description,
            salesPrice: storeCatalog.salesPrice,
        };
    }
}