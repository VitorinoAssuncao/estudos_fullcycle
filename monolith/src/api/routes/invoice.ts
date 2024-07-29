import express, {Request, Response} from "express";
import ProductAdmFacadeFactory from "../../modules/product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../modules/store-catalog/factory/facade.factory";
import InvoiceFacadeFactory from "../../modules/invoice/factory/facade.factory";

export const invoiceRoute = express.Router();

invoiceRoute.get("/:id", async (req: Request, res: Response) => {
    const usecase = InvoiceFacadeFactory.create();

    try{
        const input = {
            id: req.params.id
        }

        const output = await usecase.findInvoice(input);

        res.send(output);
    }catch(error){
        res.status(500).send(error);
    }
});
