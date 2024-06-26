export interface FindAllOutputDTO{
    products: {
        id: string;
        name: string;
        description: string;
        salesPrice: number;
      }[];
}

export interface FindByIDInputDTO{
    id: string
}

export interface FindByIDOutputDTO{
    id: string
    name: string
    description: string
    salesPrice: number
}

export default interface StoreCatalogFacadeInterface{
    findAll():Promise<FindAllOutputDTO>;
    findByID(id:FindByIDInputDTO):Promise<FindByIDOutputDTO>;
}