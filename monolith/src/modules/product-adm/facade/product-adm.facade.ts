import UseCaseInterface from "../../@shared/domain/usecase/usecase.interface";
import ProductAdmFacadeInterface, { AddProductFacadeDTO, CheckStockFacadeInputDTO, CheckStockFacadeOutputDTO } from "./product-adm.facade.interface";

export interface UseCaseProps{
    addUseCase: UseCaseInterface;
    checkStockUseCase: UseCaseInterface;
}

export default class ProductADMFacade implements ProductAdmFacadeInterface{
    private _addUseCase: any;
    private _checkStockUseCase: any;

    constructor(useCaseProps:UseCaseProps){
        this._addUseCase = useCaseProps.addUseCase;
        this._checkStockUseCase = useCaseProps.checkStockUseCase;
    }

    async addProduct(input: AddProductFacadeDTO): Promise<void> {
        return this._addUseCase.execute(input);
    }

    async checkStock(input: CheckStockFacadeInputDTO): Promise<CheckStockFacadeOutputDTO> {
        return this._checkStockUseCase.execute(input);
    }
}