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

        return {
            id: invoice.id.value,
            name: invoice.name,
            document: invoice.document,
            address: {
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipCode: invoice.address.zipCode,
            },
            items: invoice.items.map(item => ({
                id: item.id.value,
                name: item.name,
                price: item.price,
            })),
            total: invoice.calculateTotal(),
        };
    }
}