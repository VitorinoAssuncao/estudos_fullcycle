import { FindInvoiceFacadeOutputDTO } from "../facade/invoice.facade.interface";
import InvoiceGateway from "../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDTO } from "./find-invoice.dto";

export default class FindInvoiceUsecase{
    private _repository : InvoiceGateway;

    constructor(repository: InvoiceGateway){
        this._repository = repository;
    }

    async execute(input: FindInvoiceUseCaseInputDTO):Promise<FindInvoiceFacadeOutputDTO>{
        const invoice = await  this._repository.findByID(input.id);

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
            createdAt: invoice.createdAt,
        }
    }
}