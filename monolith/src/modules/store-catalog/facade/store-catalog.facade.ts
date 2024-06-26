import ID from "../../@shared/domain/vo/id.vo";
import StoreCatalogFacadeInterface, { FindAllOutputDTO, FindByIDInputDTO, FindByIDOutputDTO } from "./store-catalog.facade.interface";

export interface UsecaseProps{
    findAllUseCase: any;
    findByIDUseCase: any;
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface{
    private _findAllUseCase: any;
    private _findByIDUseCase: any;

    constructor(usecaseProps:UsecaseProps){
        this._findAllUseCase = usecaseProps.findAllUseCase;
        this._findByIDUseCase = usecaseProps.findByIDUseCase;
    }

    async findAll(): Promise<FindAllOutputDTO> {
        const products = await this._findAllUseCase.execute();
    

        return {
            products: products.map((product: any) => ({
                id: product.id.value,
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice,
            }))
        }
    }

    async findByID(input: FindByIDInputDTO): Promise<FindByIDOutputDTO> {
        return await this._findByIDUseCase.execute(input);
    }
}