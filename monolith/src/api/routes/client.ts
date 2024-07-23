import express, {Request, Response} from "express";
import ClientADMFacadeFactory from "../../modules/client-adm/factory/facade.factory";

export const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, res: Response) => {
    const usecase = ClientADMFacadeFactory.create();

    try{
     const clientDTO = {
            name: req.body.name,
            document: req.body.document,
            email: req.body.email,
            address: {
                street: req.body.address.street,
                number: req.body.address.number,
                complement: req.body.address.complement,
                city: req.body.address.city,
                state: req.body.address.state,
                zipCode: req.body.address.zipCode
            }
     }

     const output = await usecase.addClient(clientDTO);

     res.send(output);
    }catch(error){
        res.status(500).send(error);
    }
});