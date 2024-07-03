import UseCaseInterface from "../../@shared/domain/usecase/usecase.interface";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDTO, GenerateInvoiceFacadeOutputDTO } from "./invoice.facade.interface";

export interface UseCaseProps{
    generateInvoiceUseCase: UseCaseInterface;
    findInvoiceUseCase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface{
    private _generateInvoiceUseCase: any;
    private _findInvoiceUseCase: any;

    constructor(useCaseProps:UseCaseProps){
        this._generateInvoiceUseCase = useCaseProps.generateInvoiceUseCase;
        this._findInvoiceUseCase = useCaseProps.findInvoiceUseCase;
    }

    async generateInvoice(input: GenerateInvoiceFacadeInputDTO): Promise<GenerateInvoiceFacadeOutputDTO> {
        return this._generateInvoiceUseCase.execute(input);
    }

    async findInvoice(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
        return this._findInvoiceUseCase.execute(input);
    }
}