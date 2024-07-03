import FindByIDUsecase from "../../store-catalog/usecase/find-by-id/find-by-id.usecase";
import InvoiceFacade from "../facade/invoice.facade";
import InvoiceRepository from "../repository/invoice.repository";
import GenerateInvoiceUseCase from "../usecase/generate-invoice.usecase";

export default class InvoiceFacadeFactory {
    static create() {
        const repository = new InvoiceRepository();

        return new InvoiceFacade({
            generateInvoiceUseCase: new GenerateInvoiceUseCase(repository),
            findInvoiceUseCase: new FindByIDUsecase(repository)
        })
    }
}