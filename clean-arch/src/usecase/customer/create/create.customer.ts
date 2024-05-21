import Address from "../../../domain/customer/entity/address";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-interface";
import { InputCreateCustomer, OutputCreateCustomer } from "./create.customer.dto";

export default class CreateCustomerUsecase{
    private customerRepository: CustomerRepositoryInterface

    constructor(customerRepository: CustomerRepositoryInterface){
        this.customerRepository = customerRepository;
    }

    async execute(input: InputCreateCustomer): Promise<OutputCreateCustomer>{        
        const customer =  CustomerFactory.createWithAddress(input.name, new Address(input.address.street, input.address.number, input.address.zipCode, input.address.city));

        await this.customerRepository.create(customer);

        return {
            id: customer.id
        }
    }
}