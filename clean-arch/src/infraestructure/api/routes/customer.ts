import express, {Request, Response} from "express";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import CreateCustomerUsecase from "../../../usecase/customer/create/create.customer";
import ListCustomerUseCase from "../../../usecase/customer/list/list.customer";
import { json } from "sequelize";
import CustomerPresenter from "../presenters/customer.presenter";

export const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, res: Response) => {
    const usecase = new CreateCustomerUsecase(new CustomerRepository());

    try{
     const customerDTO = {
        name : req.body.name,
        address : {
            street: req.body.address.street,
            number: req.body.address.number,
            city: req.body.address.city,
            zipCode: req.body.address.zip
        }
     }

     const output = await usecase.execute(customerDTO);

     res.send(output);
    }catch(error){
        res.status(500).send(error);
    }
});

customerRoute.get("/", async (req: Request, res: Response) => {
    const usecase = new ListCustomerUseCase(new CustomerRepository());
    try{
        const output = await usecase.execute({});

        res.format({
            json: async() =>{res.send(output)},
            xml: async() =>{res.send(CustomerPresenter.toXML(output))}
        })
    }catch(error){
        res.status(500).send(error);
    }

});