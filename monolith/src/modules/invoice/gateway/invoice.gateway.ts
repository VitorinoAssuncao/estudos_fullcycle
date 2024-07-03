import Invoice from "../domain/invoice.entity";

export default interface InvoiceGateway {
    add(input: Invoice): Promise<void>;
    findByID(id: string): Promise<Invoice>;
}