import FindByIDUsecase from "../../store-catalog/usecase/find-by-id/find-by-id.usecase";
import InvoiceFacade from "../facade/invoice.facade";
import InvoiceRepository from "../repository/invoice.repository";
import GenerateInvoiceUseCase from "../usecase/generate-invoice.usecase";

export default class InvoiceFacadeFactory {
    static create() {
        const repository = new InvoiceRepository();
        const generateInvoiceUseCase = new GenerateInvoiceUseCase(repository);
        const findInvoiceUseCase = new FindByIDUsecase(repository);

        return new InvoiceFacade({
            generateInvoiceUseCase: generateInvoiceUseCase,
            findInvoiceUseCase: findInvoiceUseCase
        })
    }
}