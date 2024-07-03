export interface AddProductFacadeDTO{
    id?:string
    name: string
    description: string
    purchasePrice: number
    stock: number
}

export interface CheckStockFacadeInputDTO{
    id: string
}

export interface CheckStockFacadeOutputDTO{
    id: string
    stock: number
}

export default interface ProductAdmFacadeInterface{
    addProduct(product:AddProductFacadeDTO):Promise<void>;
    checkStock(id:CheckStockFacadeInputDTO):Promise<CheckStockFacadeOutputDTO>;
}