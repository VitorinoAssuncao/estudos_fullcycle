import Customer from "../../../domain/customer/entity/customers";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-interface";
import { ListCustomerInput, ListCustomerOutput } from "./list.customer.dto";

export default class ListCustomerUseCase {
    customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    };

    async execute(input:ListCustomerInput):Promise<ListCustomerOutput> {
        const customers = await this.customerRepository.findAll();

        return {
            customers: customers.map(customer => {
                return {
                    id: customer.id,
                    name: customer.name,
                    address: {
                        street: customer.address.street,
                        number: customer.address.number,
                        zipCode: customer.address.zip,
                        city: customer.address.city
                    }
                }
            })
        } 
    }
}