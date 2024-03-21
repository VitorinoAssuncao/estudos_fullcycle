import CustomerRepositoryInterface from "../../domain/repository/customer-interface";
import Customer from "../../domain/entity/customers"
import CustomerModel from "../db/sequelize/model/customer";
import Address from "../../domain/entity/address";

export default class CustomerRepository implements CustomerRepositoryInterface{
    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.Address.street,
            number: entity.Address.number,
            zipcode: entity.Address.zip,
            city: entity.Address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
        })
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update({
            name: entity.name,
            street: entity.Address.street,
            number: entity.Address.number,
            zipcode: entity.Address.zip,
            city: entity.Address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
        },
        {
            where: {
                id: entity.id,
            }
        })
    }

    async find(id: string): Promise<Customer> {
        const customerModel = await CustomerModel.findOne({ where: { id: id } })

        const address = new Address(customerModel.street, customerModel.number, customerModel.zipcode, customerModel.city)

        const customer = new Customer(customerModel.id, customerModel.name)

        customer.Address = address
        customer.addRewardPoints(customerModel.rewardPoints)

        if (customerModel.active){
            customer.activate();
        };

        return customer
    }

    async findAll(): Promise<Customer[]> {
        const customerModels = await CustomerModel.findAll()
        const customers = customerModels.map((customerModel) =>{
            let customer = new Customer(customerModel.id, customerModel.name);

            customer.Address = new Address(customerModel.street, customerModel.number, customerModel.zipcode, customerModel.city);
            
            customer.addRewardPoints(customerModel.rewardPoints);
            
            if (customerModel.active){
                customer.activate();
            };

            return customer
        })


        return customers
    }
}