import ID from "../../@shared/domain/vo/id.vo";
import Invoice from "../domain/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto } from "./generate-invoice.dto";

export default class GenerateInvoiceUseCase {
    private _repository : InvoiceGateway;

    constructor(repository: InvoiceGateway){
        this._repository = repository;
    }

    async execute(input: GenerateInvoiceUseCaseInputDto){
        const invoice = new Invoice({
            name: input.name,
            document: input.document,
            address: {
                street: input.street,
                number: input.number,
                complement: input.complement,
                city: input.city,
                state: input.state,
                zipCode: input.zipCode,
            },
            items: input.items
        });

        this._repository.add(invoice);

        return invoice;
    }
}