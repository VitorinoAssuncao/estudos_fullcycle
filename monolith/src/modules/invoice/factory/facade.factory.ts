import InvoiceFacade from "../facade/invoice.facade";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUsecase from "../usecase/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice.usecase";

export default class InvoiceFacadeFactory {
    static create() {
        const repository = new InvoiceRepository();
        const generateInvoiceUseCase = new GenerateInvoiceUseCase(repository);
        const findInvoiceUseCase = new FindInvoiceUsecase(repository);

        return new InvoiceFacade({
            generateInvoiceUseCase: generateInvoiceUseCase,
            findInvoiceUseCase: findInvoiceUseCase
        })
    }
}