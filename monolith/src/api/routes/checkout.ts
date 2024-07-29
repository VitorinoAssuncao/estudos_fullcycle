import express, {Request, Response} from "express";
import ClientADMFacadeFactory from "../../modules/client-adm/factory/facade.factory";
import CheckoutFacadeFactory from "../../modules/checkout/factory/facade.factory";

export const checkoutRoute = express.Router();

checkoutRoute.post("/", async (req: Request, res: Response) => {
    const useCase = CheckoutFacadeFactory.create();

    try{
     const input = { 
            clientID: req.body.clientID,
            products: req.body.products.map((product: any) => ({
                productID: product.productID
            }))
     }

     const output = await useCase.placeOrder(input);

     res.send(output);
    }catch(error){
        console.log(error);
        
        res.status(500).send(error);
    }
});