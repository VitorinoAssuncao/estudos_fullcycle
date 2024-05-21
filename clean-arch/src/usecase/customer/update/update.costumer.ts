import Address from "../../../domain/customer/entity/address";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-interface";
import { UpdateCustomerInput, UpdateCustomerOutput } from "./update.costumer.dto";

export default class UpdateCostumerUseCase{
    private customerRepository: CustomerRepositoryInterface

    constructor(customerRepository: CustomerRepositoryInterface){
        this.customerRepository = customerRepository;
    }

    async execute(input: UpdateCustomerInput): Promise<UpdateCustomerOutput>{
        const customer = await this.customerRepository.find(input.id);

        customer.changeName(input.name);
        customer.changeAddress(new Address(
            input.address.street, 
            input.address.number, 
            input.address.zipCode, 
            input.address.city
        ));

        await this.customerRepository.update(customer);

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
    }
}