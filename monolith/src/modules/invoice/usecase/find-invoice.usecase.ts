import InvoiceGateway from "../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDTO } from "./find-invoice.dto";

export default class FindInvoiceUsecase{
    private _repository : InvoiceGateway;

    constructor(repository: InvoiceGateway){
        this._repository = repository;
    }

    async execute(input: FindInvoiceUseCaseInputDTO){
        return this._repository.findByID(input.id);
    }
}