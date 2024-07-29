import express, {Request, Response} from "express";
import ProductAdmFacadeFactory from "../../modules/product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../modules/store-catalog/factory/facade.factory";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
    const usecase = ProductAdmFacadeFactory.create();

    try{
     const input = {
            name: req.body.name,
            description: req.body.description,
            purchasePrice: req.body.purchasePrice,
            salesPrice: req.body.salesPrice,
            stock: req.body.stock,
     }

     const output = await usecase.addProduct(input);

     res.send(output);
    }catch(error){
        res.status(500).send(error);
    }
});

productRoute.get("/:id", async (req: Request, res: Response) => {
    const usecase = StoreCatalogFacadeFactory.create();

    try{
        const input = {
            id: req.params.id
        }

        const output = await usecase.findByID(input);

        res.send(output);
    }catch(error){
        res.status(500).send(error);
    }
});

productRoute.get("/", async (req: Request, res: Response) => {
    const usecase = StoreCatalogFacadeFactory.create();

    try{

        const output = await usecase.findAll();

        res.send(output);
    }catch(error){
        res.status(500).send(error);
    }
});

