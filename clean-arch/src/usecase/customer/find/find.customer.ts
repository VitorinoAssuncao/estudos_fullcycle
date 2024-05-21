import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-interface";
import { FindCustomerInput, FindCustomerOutput } from "./find.customer.dto";

export default class FindCustomerUsecase{
    private customerRepository: CustomerRepositoryInterface

    constructor(customerRepository: CustomerRepositoryInterface){
        this.customerRepository = customerRepository;
    }

    async execute(input: FindCustomerInput): Promise<FindCustomerOutput>{
        const customer = await this.customerRepository.find(input.id);

        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.Address.street,
                number: customer.Address.number,
                zipCode: customer.Address.zip,
                city: customer.Address.city
            }
        }
    }
}

